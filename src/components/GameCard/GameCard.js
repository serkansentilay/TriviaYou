import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const GameCard = ({ item }) => {
    console.log("item gamecard", item)
    const objk = [item.correct, item.wrong1, item.wrong2, item.wrong3]
    console.log("javscript", item.includes("correct"))

    return (
        <View style={{ padding: 5, margin: 5, backgroundColor: 'red' }}>
            <View style={{ backgroundColor: 'white', height: 200, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{item.ques}</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: 'white', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontSize: 18 }}>{item.wrong1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'white' }}>
                <Text style={{ color: 'black', fontSize: 18 }}>{item.wrong2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'white' }}>
                <Text style={{ color: 'black', fontSize: 18 }}>{item.wrong3}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'white' }}>
                <Text style={{ color: 'black', fontSize: 18 }}>{item.correct}</Text>
            </TouchableOpacity>

        </View>
    )
}

export default GameCard

