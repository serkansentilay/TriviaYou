import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
    webClientId: 'xxxxxxxxxxxxx',
});

const initialState = {
    user: null,
    loading: false
}

export const signInGoogle = createAsyncThunk("signInGoogle", async () => {

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);

})

export const signOutGoogle = createAsyncThunk("signOutGoogle", async () => {
    await GoogleSignin.signOut();
    await auth().signOut()

})

export const AuthSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        update: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signInGoogle.pending, state => {
            state.loading = true
            console.log("signInGoogle beklemede")
        })
        builder.addCase(signInGoogle.fulfilled, (state, action) => {
            console.log("signInGoogle tamamlandı", action.payload)
            console.log("signInGoogle tamamlandı user", action.payload.user)
            state.user = action.payload.user
            state.loading = false
            console.log("user setlenedi", state.user)
        })
        builder.addCase(signOutGoogle.pending, state => {
            console.log("signOutGoogle beklemede")
            state.loading = true
        })
        builder.addCase(signOutGoogle.fulfilled, state => {
            console.log("signOutGoogle tamamlandı")
            state.user = null
            state.loading = false
        })
    }
})

export const { update } = AuthSlice.actions

export default AuthSlice.reducer