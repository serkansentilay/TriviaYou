import { Text, View, Modal, TouchableOpacity, ScrollView, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from "@react-native-firebase/database"
import GameCard from '../../components/GameCard'
import auth from "@react-native-firebase/auth"

const Game = ({ route }) => {
    const { name, level, count } = route.params
    const { uid } = auth().currentUser
    console.log("uid", uid)
    console.log("name", name, "level", level, "count", count)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentQuesIndex, setCurrentQuesIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null)
    const [correctOption, setCorrectOption] = useState(null)
    const [isOptionsDisabled, setIsOptionDisabled] = useState(false)
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)
    const [progress, setProgress] = useState(new Animated.Value(0))
    const [timer, setTimer] = useState(12)


    useEffect(() => {
        getDatabase()
        setLoading(false)
    }, [])

    const getDatabase = async () => {
        switch (level) {
            case "Basic":
                switch (count) {
                    case 10:
                        await database().ref(`/games/${name}`).limitToFirst(10).once("value").then(snp => {
                            console.log("basic 10 snp ", snp)
                            snp.forEach(doc => {
                                if (doc.val() === null) { return } else {

                                    console.log("basic 10 doc ", doc.val())
                                    setData(prev => [...prev, doc.val()])
                                }
                            })
                        })
                        break;

                    default:
                        await database().ref(`/games/${name}`).limitToFirst(5).once("value").then(snp => {
                            console.log("basic 5 snp ", snp)
                            snp.forEach(doc => {
                                if (doc.val() === null) { return } else {

                                    console.log("basic 5 snp ", snp)
                                    setData(prev => [...prev, doc.val()])
                                }
                            })
                        })
                        break;
                }
                break;

            default:
                switch (count) {
                    case 10:
                        await database().ref(`/games/${name}`).limitToLast(10).once("value").then(snp => {
                            console.log("hard 10 snp ", snp)
                            snp.forEach(doc => {
                                if (doc.val() === null) { return } else {

                                    console.log("hard 10 snp ", snp)
                                    setData(prev => [...prev, doc.val()])
                                }
                            })
                        })
                        break;

                    default:
                        await database().ref(`/games/${name}`).limitToLast(5).once("value").then(snp => {
                            console.log("hard 5 snp ", snp)
                            snp.forEach(doc => {
                                if (doc.val() === null) { return } else {

                                    console.log("hard 5 snp ", snp)
                                    setData(prev => [...prev, doc.val()])
                                }
                            })
                        })
                        break;
                }
                break;
        }
    }

    console.log("data", data)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000)
        if (timer === 0) {
            clearTimeout(interval)
            handleNext()
        }
        return () => clearInterval(interval);
    }, [timer])

    if (loading) {
        return <Text>Loading...</Text>
    }

    const handleNext = () => {
        setTimer(12)
        if (currentQuesIndex == data.length - 1) {
            setShowScoreModal(true)
            //databse kaydetme score yapalım
            database().ref(`/LeaderBords/${uid}`).orderByValue("score").on("value", snp => {
                if (score > snp.val().score) {
                    database().ref(`/LeaderBords/${uid}`).update({
                        score
                    })
                }
            })
        } else {
            setCurrentQuesIndex(currentQuesIndex + 1)
            setCurrentOptionSelected(null)
            setCorrectOption(null)
            setIsOptionDisabled(false)
            setShowNextButton(false)
        }
        Animated.timing(progress, {
            toValue: currentQuesIndex + 1,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }

    const checkAnswer = (selectedOption) => {
        let correctOpt = data[currentQuesIndex]["correct"]
        console.log("correctopt", correctOpt)
        setCurrentOptionSelected(selectedOption)
        setCorrectOption(correctOpt)
        setIsOptionDisabled(true)
        if (selectedOption == correctOpt) {
            setScore(prev => prev + 10)
        }
        setShowNextButton(true)

    }

    const handleRetry = () => {
        setShowScoreModal(false)
        setCurrentQuesIndex(0)
        setScore(0)
        setCurrentOptionSelected(null)
        setCorrectOption(null)
        setIsOptionDisabled(false)
        setShowNextButton(false)
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }


    const progressAnima = progress.interpolate({
        inputRange: [0, data.length],
        outputRange: ["0%", "100%"]
    })



    return (
        <>
            {data && <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ flex: 1, margin: 5, padding: 5 }}>
                    <View style={{ width: '100%', height: 20, borderRadius: 20, backgroundColor: "lightblue" }}>
                        <Animated.View style={{
                            height: 20,
                            borderRadius: 20,
                            backgroundColor: 'orange',
                            width: progressAnima
                        }}>

                        </Animated.View>

                    </View>
                    <Text style={{ fontSize: 20, color: 'red' }}>{timer}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginVertical: 10 }}>
                        <Text style={{ color: 'black', fontSize: 20 }}>{currentQuesIndex + 1}</Text>
                        <Text style={{ color: 'black', fontSize: 20 }}>/{data.length}</Text>
                    </View>

                    <View >
                        <Text style={{ color: 'black', fontSize: 35, fontWeight: 'bold' }}>{data[currentQuesIndex]?.ques}</Text>
                    </View>


                    <View>
                        {data[currentQuesIndex]?.options.map(option => (
                            <TouchableOpacity
                                onPress={() => checkAnswer(option)}
                                key={option}
                                disabled={isOptionsDisabled}
                                style={{
                                    borderWidth: 3,
                                    borderColor: option == correctOption ? "green" : option == currentOptionSelected ? "red" : 'gray',
                                    backgroundColor: option == correctOption ? "lightgreen" : option == currentOptionSelected ? "tomato" : 'orange',
                                    height: 50,
                                    borderRadius: 30,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 30,
                                    marginVertical: 20

                                }}
                            >
                                <Text style={{ color: 'black', fontSize: 25, }}>{option}</Text>
                                {option == correctOption ? (
                                    <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ borderWidth: 1, borderColor: 'green' }}></Text>
                                    </View>
                                ) : option == currentOptionSelected ? (
                                    <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ borderWidth: 1, borderColor: 'red' }}></Text>
                                    </View>
                                ) : null}
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View>
                        {showNextButton && (
                            <TouchableOpacity
                                onPress={handleNext}
                                style={{ marginTop: 20, width: '100%', backgroundColor: 'tomato', padding: 20, borderRadius: 5 }}>
                                <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>NEXT</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={showScoreModal}
                    >
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                backgroundColor: 'white',
                                width: '90%',
                                borderRadius: 20,
                                padding: 20,
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>{score > 0 ? "Wow! Amazing.." : "This is not good!"}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: 20
                                }}>
                                    <Text style={{ fontSize: 30, color: score > 0 ? "green" : "red" }}>{score}</Text>
                                    <Text style={{ fontSize: 25, color: "black" }}>/{data.length}</Text>

                                </View>
                                <TouchableOpacity onPress={handleRetry} style={{ backgroundColor: 'tomato', padding: 20, width: '100%', borderRadius: 20 }}>
                                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>RETRY</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </Modal>


                </View >
            </ScrollView>
            }
        </>
    )
}

export default Game