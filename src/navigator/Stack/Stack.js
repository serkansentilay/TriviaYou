import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../Pages/Home";
import Game from "../../Pages/Game";
import Type from "../../Pages/Type";

const HomeStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()

export const StackHome = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="Type" component={Type} />
            <HomeStack.Screen name="Game" component={Game} />

        </HomeStack.Navigator>
    )
}

export const StackProfile = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen />
            <ProfileStack.Screen />
            <ProfileStack.Screen />
        </ProfileStack.Navigator>
    )
}