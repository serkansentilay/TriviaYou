import { Text, View, Button } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signInGoogle } from '../../context/Auth/AuthSlice'
import styles from "./Login.style"
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

const Login = () => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.auth.loading)

    const submit = () => {
        dispatch(signInGoogle())
    }

    if (loading) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <GoogleSigninButton onPress={submit} />
        </View>
    )

}

export default Login