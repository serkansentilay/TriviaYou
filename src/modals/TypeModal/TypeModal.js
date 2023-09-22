import Modal from "react-native-modal"
import { View, Text, Switch, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import Button from "../../components/Button"
import { useNavigation } from "@react-navigation/native"

export default TypeModal = ({ isVisible, onClose, name }) => {
    const [level, setLevel] = useState(true)
    const [count, setCount] = useState(true)
    const navigation = useNavigation()

    const switchLevelToggle = () => {
        setLevel(prev => !prev)
    }
    const switchCountToggle = () => {
        setCount(prev => !prev)
    }

    const readyToStart = () => {
        //level true "Basic" false "Hard"
        //count true 10 false 5
        navigation.navigate("Game", {
            name,
            level: level ? "Basic" : "Hard",
            count: count ? 10 : 5
        })

    }

    return (
        <Modal
            isVisible={isVisible}
            onSwipeCancel={onClose}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            swipeDirection={'down'}

        >
            <View style={{ height: 400, justifyContent: 'space-around', backgroundColor: 'gray', borderRadius: 50, margin: 10, padding: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: 'orange' }}>TYPE: {name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                    <Text style={{ color: 'orange', fontWeight: 'bold' }}>Select Level : </Text>
                    <Text style={{ fontSize: 20 }}>{level ? "Basic" : "Hard"}</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={level ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        value={level}
                        onValueChange={switchLevelToggle}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                    <Text style={{ color: 'orange', fontWeight: 'bold' }}>Select Question Count : </Text>
                    <Text style={{ fontSize: 20 }}>{count ? "10" : "5"}</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={count ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        value={count}
                        onValueChange={switchCountToggle}
                    />
                </View>
                <Button onPress={() => readyToStart()} backgrndColor={"orange"} text={"START"} />
            </View>

        </Modal>
    )
}