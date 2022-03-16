import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,  FlatList, SafeAreaView } from 'react-native'
import styles from './styles';
import { db, auths, firebase } from '../../firebase'
import { Title, Caption, Avatar, useTheme } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

// designing a protype on how to 'remove' feature

export default function FriendScreen(props) {
    const {colors} = useTheme();

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


        db.collection("users").where("username", "==", text)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // update the friend list field
                if(doc.exists) {
                    console.log("exists");
                    db.collection('friends').doc(doc.id).update({
                        friendlist: firebase.firestore.FieldValue.arrayRemove(props.extraData.username),
                    }, { merge: true });
                }   
            });
        })                    


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
                      }, { merge: true });
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

                    

                    // adding friend into the other list
                    db.collection('friends').doc(doc.id).set({
                        friendUserName: text,
                        friendlist: firebase.firestore.FieldValue.arrayUnion(props.extraData.username),
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    }, { merge: true });
                    // db.collection('friends').doc(doc.id).update({
                    //     friendlist: firebase.firestore.FieldValue.arrayUnion(prop.extraData.username),
                    // })
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

    // display a list of users into elements in array 
    const displayFriend = (listfriend, id) => {
        var num = listfriend.length;
        var myloop = [];
        for (let i = 0; i < num; i++) {
            myloop.push(
                <View key={i} style={styles.infoBoxWrapper}>

                    <View style={{marginRight:10}}>
                            <FontAwesome name="user" color='blue'  size={20} backgroundColor="blue"/>
                        </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color: '#1E90FF', marginTop: 2, marginBottom: 2}}>
                            {listfriend[i]
                        }</Text>
                        <View style={{marginLeft:10}}>
                            <FontAwesome name="comment" color='#1E90FF'  size={15} backgroundColor="blue"/>
                        </View>
                    </View>
                </View>
            );
        }
        return myloop
    } 

    
    return(
        <SafeAreaView style={styles.container}> 

            <View style={styles.userInfoSection}>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Avatar.Image 
                        source={{
                            uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                        }}
                        size={80}
                        />
                        <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {
                                marginTop:15,
                                marginBottom: 1,
                                }]}>
                            {props.extraData.fullName}
                        </Title>
                        <Caption style={styles.caption}>Protype FriendList</Caption>
                        </View>
                    </View>

                    </View>

            <View style={styles.container}>

                <Caption style={{fontSize: 15}}> Friend Usernames </Caption>

                {friend.map(({id, friendlist}) => (
                    <View key={id}>
                   { displayFriend(friendlist, id)}
                    </View>

                ))}
            </View>

            {errors ? <View style={{flexDirection: 'row'}}>
                <FontAwesome name="remove" color='red'  size={15} backgroundColor="blue"/>
                <Text style={{color: 'red', marginTop: 0}}> {errors} </Text>  
                </View>: null
                }
            <View style={{marginBottom: 10, flexDirection: 'row'}}>
                <View style={{marginRight:10}}>
                    <FontAwesome name="search" color='gray'  size={15} backgroundColor="blue"/>
                </View>
                <TextInput
                    placeholder="Type username"
                    onChangeText={(text) => setText(text)} 
                    value={text}
                />
            </View>

            <TouchableOpacity onPress={addOnPress} style={[styles.button]}>
                <View style={{flexDirection: 'row'}}>
                    <FontAwesome name="check-circle" color='white'  size={20} backgroundColor="blue"/>
                    <Text style={[styles.buttonText, {marginLeft: 10}]}>
                    Add Friend </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={removeOnPress} style={[styles.button, {backgroundColor: 'red'}]}>
                <View style={{flexDirection: 'row'}}>
                    <FontAwesome name="user-times" color='white'  size={20} backgroundColor="blue"/>
                    <Text style={[styles.buttonText, {marginLeft: 10}]}>
                    Remove Friend </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
        
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