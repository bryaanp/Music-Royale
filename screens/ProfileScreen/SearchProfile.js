import React, { useEffect, useState, useContext } from 'react'
import {Image, Text, TextInput, TouchableOpacity, View, FlatList, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase'
import { getUserById } from '../SearchScreen/user'
import { CurrentUserProfileItemInViewContext } from './checkUser'

// two new packets that need to be install in terminal 
// yarn add 'react-native-vector-icons'
// yarn add 'react-native-paper'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {
    Avatar,
    Title,
    Caption,
    TouchableRipple,
    useTheme,
  } from 'react-native-paper';
  
  // search profile function, take route from Searchuseritem function, under ../components/search/userItem/index.js
export default function SearchProfile( { route }  ) {
    const  { initialUserId }  = route.params


    // constant value that will change form time to time. 
    const {colors} = useTheme();
    const [FullName, setFullname] = useState('')


    const entityRef = firebase.firestore().collection('users')
    const db = firebase.firestore()
    const userData = getUserById(initialUserId);
    const userID = userData.id
    const fullName = userData.fullName
    const username = userData.username
    const email =  userData.email
    const country =  userData.country

    // updates the firebase database 
    const addOnPress = () => {

        // checking the user input to see if 'users' has contain such a username 
        db.collection("users").where("username", "==", initialUserId)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // update the friend list field
                if(doc.exists) {
                    console.log("exists");
                    db.collection('friends').doc(uid).set({
                        id: uid,
                        friendUserName: initialUserId,
                        friendlist: firebase.firestore.FieldValue.arrayUnion(initialUserId),
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    }, { merge: true });

                    

                    // adding friend into the other list
                    db.collection('friends').doc(doc.id).set({
                        friendUserName: initialUserId,
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

        // console.log(Object.keys(friend))
    }


 // styling for search profile UI, similar to original profile UI
        
    return( 
        
        <SafeAreaView style={styles.container}>

        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image 
              source={{
                uri: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
              }}
              size={80}
            />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop:15,
                marginBottom: 1,
              }]}>{initialUserId}</Title>
              <Caption style={styles.caption}>{email}</Caption>
            </View>
          </View>

        </View>
        
        
        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            {/* Todo: need counter towards the wins */}
            <Title>29</Title>  
            <Caption>Number of Wins</Caption>
          </View>
          <View style={styles.infoBox}>
            {/* Todo: need counter towards favorite songs */}
            <Title>34</Title>
            <Caption>Number of Favorite Songs</Caption>
          </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={styles.userInfoSection}>
            <View style={styles.action}>
                <FontAwesome name="user-o" color={colors.text}  size={20} />
                
                <Caption style={styles.caption}>{userData.fullName}</Caption>

       
            </View>


        </View>
      </View>



      <TouchableOpacity
            style={styles.button}
            onPress={() => addOnPress()}>
            <Text style={styles.buttonTitle}>Add Friend</Text>
       </TouchableOpacity>
      </SafeAreaView>

    )
}