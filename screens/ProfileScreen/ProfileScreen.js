import React, { useEffect, useState } from 'react'
import {Image, Text, TextInput, TouchableOpacity, View, FlatList, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase'

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
  
export default function ProfileScreen(props) {
    
    // constant value that will change form time to time. 
    const {colors} = useTheme();
    const [FullName, setFullname] = useState('')
    const [emailName, setEmial] = useState('')
    const [phoneName, setPhone] = useState('')
    const [countryName, setCountry] = useState('')

    // extract the firebase database 
    const entityRef = firebase.firestore().collection('users')
    const db = firebase.firestore()
    const userID = props.extraData.id
    const fullName = props.extraData.fullName
    const email =  props.extraData.email
    const phone =  props.extraData.phone
    const country =  props.extraData.country


    // updates the firebase database 
        if (FullName.length != 0) {
            db.collection('users').doc(userID).update({
                fullName: FullName,
            })        
        }

        if (emailName.length != 0) {
            db.collection('users').doc(userID).update({
                email: emailName,
            })        
        }

        if (phoneName.length != 0) {
            db.collection('users').doc(userID).update({
                phone: phoneName,
            })        
        }

        if (countryName.length != 0) {
            db.collection('users').doc(userID).update({
                country: countryName,
            })        
        }
            console.log("Update sucessful");
        }

    const signOutButton = () => {
      // todo: needs to establish a connection to the database in order for it to sign out here.
      navigation.navigate('Login')
      // firebase.auth().signOut().then(setUser(Null))
    }
    
    // todo: Needs a little more work so it'll be able to change the display name
    const refreshPage =  () => {
        db.collection('users').where("id", "==", userID)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var full = doc.get("fullname");
            })
        })
    }

        
    return( 
        
        <SafeAreaView style={styles.container}>

        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
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
              }]}>{props.extraData.fullName}</Title>
              <Caption style={styles.caption}>{email}</Caption>
              <Caption style={styles.caption}>{phone}</Caption>
            </View>
          </View>

        </View>
        
        
        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            {/* Todo: need counter towards the wins */}
            <Title>140</Title>  
            <Caption>Number of Wins</Caption>
          </View>
          <View style={styles.infoBox}>
            {/* Todo: need counter towards favorite songs */}
            <Title>12</Title>
            <Caption>Number of Favorite Songs</Caption>
          </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={styles.userInfoSection}>
            <View style={styles.action}>
                <FontAwesome name="user-o" color={colors.text}  size={20} />
                
                <TextInput style={styles.infoBox}
                    placeholder={" Full Name"}
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={(text) => setFullname(text)}
                />
       
            </View>
            <View style={styles.action}>
                <FontAwesome name="envelope-o" color={colors.text}  size={20} />
                <TextInput style={styles.infoBox}
                    placeholder=" email"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={(text) => setEmial(text)}
                />
            </View>

        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={styles.userInfoSection}>
            <View style={styles.action}>
                <Feather name="phone" color={colors.text} size={20} />
                <TextInput
                    placeholder="Phone"
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    onChangeText={(text) => setPhone(text)}
                />
            </View>

            <View style={styles.action}>
                <FontAwesome name="globe" color={colors.text} size={20} />
                <TextInput
                    placeholder="Country"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={(text) => setCountry(text)}
                 />
            </View>

        </View>
      </View>

      <TouchableOpacity
            style={styles.button}
            onPress={() => saveChangesButtonPress()}>
            <Text style={styles.buttonTitle}>Save Changes</Text>
       </TouchableOpacity>
      </SafeAreaView>

    )
}