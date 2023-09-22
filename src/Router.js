import { NavigationContainer } from "@react-navigation/native";
import Bottom from "./navigator/Bottom";
import Login from "./Pages/Login";
import auth from "@react-native-firebase/auth"
import { useDispatch } from "react-redux"
import { update } from './context/Auth/AuthSlice'
import { LogBox } from "react-native";
import { useEffect } from "react";
LogBox.ignoreAllLogs()

export default Router = () => {

    let user = auth().currentUser
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(update(user))
    }, [])
    return (<>
        {user ? <NavigationContainer>
            <Bottom />
        </NavigationContainer>
            : <Login />}
    </>
    )
}