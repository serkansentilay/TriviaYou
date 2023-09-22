import { Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import TypeCard from '../../components/TypeCard'
import TypeModal from '../../modals/TypeModal/TypeModal'

const data = [
    { id: 1, name: "Math", },
    { id: 2, name: "Science", },
    { id: 3, name: "Movie", },
    { id: 4, name: "TvSeries", },
    { id: 5, name: "Music", },
    { id: 6, name: "History", },

]


const Type = ({ navigation }) => {
    const [isVisible, setVisible] = useState(false)
    const [typeName, setTypeName] = useState(null)

    const renderType = ({ item }) => <TypeCard onClick={() => handleSelectedType(item.name)} item={item} />

    const handleSelectedType = (name) => {
        //modal açılsın ardından soru sayısı ve zorluk seçsin
        //soru sayısı 5 ya da 10, kolay ilk5 soru zorluk son 5 soru 
        //navigation.navigate("Game", { name })
        setTypeName(name)
        toggleSwitch()

    }

    const toggleSwitch = () => {
        setVisible(!isVisible)
    }

    const toggleClose = () => {
        setVisible(!isVisible)
    }

    return (
        <>
            <FlatList
                contentContainerStyle={{ padding: 10, justifyContent: 'space-around', alignItems: 'center' }}
                numColumns={2}
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderType}
            />
            <TypeModal isVisible={isVisible} onClose={toggleClose} name={typeName} />
        </>
    )
}

export default Type
