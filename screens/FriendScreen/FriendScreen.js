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
    const [text, setText] = useState('')
    const [errors, setError] = useState('')
   
    // timer of displaying an error 
    const updateError = (error, setError) => {
        setError(error);
        setTimeout(() => {
            setError('')
        }, 2500);
    }

    // grabs the current user data in 'friends' collection 
    useEffect(() => {
        db.collection('friends').orderBy('friendUserName').where('id', '==', uid).onSnapshot((snapshot) => {
            setFriend(snapshot.docs.map(doc => doc.data()))
        })
        }, [])
    

    const removeOnPress = () => {

        var flag = false; // flag condition
        db.collection('friends').where('friendlist', 'array-contains', text).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // update the friend list to remove 'verify' username
                if(doc.exists) {
                    console.log(doc);
                    console.log("exists in list removing it");
                    db.collection('friends').doc(uid).update({
                        friendlist: firebase.firestore.FieldValue.arrayRemove(text),
                      })
                    flag = true;
                    return; 
                }   
            });
            // user input doesn't contain the username
            flag ? null : updateError('cannot be found in friendlist', setError)
            flag ? null: console.log("doesnt exists");
            setText('')
            Keyboard.dismiss()
        })
        .catch(function(error) {
            // console.log("Error getting documents: ", error);
        });

    }


    const addOnPress = () => {

        // checking the user input to see if 'users' has contain such a username 
        db.collection("users").where("username", "==", text)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // update the friend list field
                if(doc.exists) {
                    console.log("exists");
                    db.collection('friends').doc(uid).set({
                        id: uid,
                        friendUserName: text,
                        friendlist: firebase.firestore.FieldValue.arrayUnion(text),
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    }, { merge: true });
                    setText('')
                    Keyboard.dismiss()
                    return; 
                }   
            });
            // user input doesn't contain the username
            updateError('Invalid Username', setError)
            console.log("doesnt exists");
            setText('')
            Keyboard.dismiss()
        })
        .catch(function(error) {
            // console.log("Error getting documents: ", error);
        });



        console.log(Object.keys(friend))
    }

    
    return(
        <View style={styles.container}>
        <Text> FriendList</Text>
            {friend.map(({id, friendlist}) => (
            <View key={id}>
                <Text>
                    {friendlist[0]} {"\n"}
                    {friendlist[1]} {"\n"}
                    {friendlist[2]} {"\n"}
                    {friendlist[3]} {"\n"}
                    {friendlist[4]} {"\n"}
                    {friendlist[5]} {"\n"}
                    </Text>
            </View>
            ))}

        <Text> {"\n"} Protype on adding a friend</Text>

        <TextInput
            placeholder="Type username"
            onChangeText={(text) => setText(text)} 
            value={text}
        />
        {errors ? <Text style={{color: 'red'}}> {errors} </Text>: null

        }
        <TouchableOpacity onPress={addOnPress} style={styles.button}>
            <Text style={styles.buttonText}> Add Friend </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={removeOnPress} style={styles.button}>
            <Text style={styles.buttonText}> Remove Friend </Text>
        </TouchableOpacity>

        </View>
        
        
    )
}
// db.collection('friends').doc(uid).get()
// .then((doc) => {
//     if(doc.exists) {
//         console.log("exists");
//         // console.log(doc);
//     } else {
//         console.log("doesnt exists");
//     }
//   });

//   db.collection('friends').doc(uid).update({
//     friendlist: firebase.firestore.FieldValue.arrayRemove(text),
//   })