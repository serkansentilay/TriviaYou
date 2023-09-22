import { Text, View, Image } from 'react-native'
import React from 'react'
import styles from "./LeaderCard.style"

const LeaderCard = ({ item }) => {
    console.log("loeadercard", item)
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.photo }} width={75} height={75} borderRadius={50} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score}</Text>
        </View>
    )
}

export default LeaderCard
