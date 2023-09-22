import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import LeaderCard from '../../components/LeaderCard'
import database from '@react-native-firebase/database';
import Button from '../../components/Button';

const Home = ({ navigation }) => {
    const [leaderBoards, setLeaderBoards] = useState([])

    useEffect(() => {
        getLeader()
    }, [])

    const getLeader = async () => {
        //databaseden çekelim
        await database().ref("/LeaderBords").orderByChild("score").limitToFirst(6).on("value", snp => {
            console.log("snp", snp)
            snp.forEach(doc => {
                console.log("doc", doc.val())
                setLeaderBoards(prev => [...prev, doc.val()])
            })
        })
    }
    console.log("leaderboardsds", leaderBoards.length)
    const renderLeader = ({ item }) => <LeaderCard item={item} />

    const handleStart = () => {
        navigation.navigate("Type")
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 40, color: 'orange', fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>Trivia You</Text>
            <FlatList
                contentContainerStyle={{ flex: 1 }}
                data={leaderBoards}
                keyExtractor={item => item.id}
                renderItem={renderLeader}
            />
            <Button backgrndColor={"tomato"} text={"NEXT"} onPress={() => handleStart()} />

        </View>
    )
}

export default Home
