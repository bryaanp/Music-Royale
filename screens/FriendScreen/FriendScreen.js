import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,  FlatList } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { db, auths, firebase } from '../../firebase'
import { Button, List } from 'react-native-paper';

// designing a protype on how to 'remove' feature

export default function FriendScreen({props}) {
    const {uid} = auths.currentUser
    const [friend, setFriend] = useState([])
    const [userName, setUsername] = useState('')


    useEffect(() => {
        db.collection('friends').orderBy('friendOneName').where('friendOneName', '==', userName).onSnapshot((snapshot) => {
            setFriend(snapshot.docs.map(doc => doc.data()))
        })
        }, [])

    const removeOnPress = () => {
        db.collection('friends').doc(userID).delete({
            friendOneName: userID,
        }
    )
    }

    const addOnPress = () => {
        db.collection('friends').add({
            id: uid,
            friendOneName: userName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
    }
    
    return(
        <View style={styles.container}>
        <Text> FriendList </Text>
            {friend.map(({id, friendOneName}) => (
            <View key={id}>
                <Text>{friendOneName}</Text>
            </View>
            ))}

        <Text> {"\n"} Protype on adding a friend</Text>
        <TextInput
            placeholder="Type username"
            onChangeText={(text) => setUsername(text)} 
        />
        <TouchableOpacity onPress={addOnPress} style={styles.button}>
            <Text style={styles.buttonText}> Add Friend </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={removeOnPress} style={styles.button}>
            <Text style={styles.buttonText}> Remove Friend </Text>
        </TouchableOpacity>

        </View>
        
        
    )
}
