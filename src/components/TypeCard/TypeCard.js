import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const TypeCard = ({ item, onClick }) => {
    console.log("typecard", item)

    return (
        <TouchableOpacity onPress={onClick} style={{ backgroundColor: 'orange', margin: 10, borderRadius: 50, width: 150, height: 150, justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
        </TouchableOpacity>
    )
}

export default TypeCard
