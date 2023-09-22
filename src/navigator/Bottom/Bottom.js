import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackHome } from "../Stack/Stack";

const Tab = createBottomTabNavigator()

export default Bottom = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Main" component={StackHome} />

        </Tab.Navigator>
    )
}