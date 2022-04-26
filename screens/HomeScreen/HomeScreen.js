import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase'

export default function HomeScreen(props) {

    const questions = [{
            questionText: 'What is the capital of France?',
            answerOptions: [
                { answerText: 'New York', isCorrect: false },
                { answerText: 'London', isCorrect: false },
                { answerText: 'Paris', isCorrect: true },
                { answerText: 'Dublin', isCorrect: false },
            ],
        },
        {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
                { answerText: 'Jeff Bezos', isCorrect: false },
                { answerText: 'Elon Musk', isCorrect: true },
                { answerText: 'Bill Gates', isCorrect: false },
                { answerText: 'Tony Stark', isCorrect: false },
            ],
        },
        {
            questionText: 'The iPhone was created by which company?',
            answerOptions: [
                { answerText: 'Apple', isCorrect: true },
                { answerText: 'Intel', isCorrect: false },
                { answerText: 'Amazon', isCorrect: false },
                { answerText: 'Microsoft', isCorrect: false },
            ],
        },
        {
            questionText: 'How many Harry Potter books are there?',
            answerOptions: [
                { answerText: '1', isCorrect: false },
                { answerText: '4', isCorrect: false },
                { answerText: '6', isCorrect: false },
                { answerText: '7', isCorrect: true },
            ],
        },
    ];

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id

    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const renderEntity = ({ item, index }) => {
        return ( <
            View style = { styles.entityContainer } >
            <
            Text style = { styles.entityText } > { index }. { item.text } <
            /Text> <
            /View>
        )
    }

    return ( <
        View style = { styles.container } >

        <
        Text > What is the capitol of Switzerland ? < /Text>

        <
        TouchableOpacity style = {
            [styles.button, { marginTop: 150 }] }
        onPress = { onAddButtonPress } >
        <
        Text style = { styles.buttonText } > Option 1 < /Text> <
        /TouchableOpacity> <
        TouchableOpacity style = {
            [styles.button, { marginTop: 150 }] }
        onPress = { onAddButtonPress } >
        <
        Text style = { styles.buttonText } > Option 2 < /Text> <
        /TouchableOpacity> <
        TouchableOpacity style = {
            [styles.button, { marginTop: 150 }] }
        onPress = { onAddButtonPress } >
        <
        Text style = { styles.buttonText } > Option 3 < /Text> <
        /TouchableOpacity> <
        TouchableOpacity style = {
            [styles.button, { marginTop: 150 }] }
        onPress = { onAddButtonPress } >
        <
        Text style = { styles.buttonText } > Option 4 < /Text> <
        /TouchableOpacity>


        <
        View style = { styles.formContainer } >
        <
        TextInput style = { styles.input }
        placeholder = 'Type here or button'
        placeholderTextColor = "#aaaaaa"
        onChangeText = {
            (text) => setEntityText(text) }
        value = { entityText }
        underlineColorAndroid = "transparent"
        autoCapitalize = "none" /
        >

        <
        /View>

        <
        /View>
    )
}