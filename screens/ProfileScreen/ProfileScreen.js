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
    const [FullName2, setFullname2] = useState(props.extraData.fullName)
    const [emailName, setEmial] = useState('')
    const [emailName2, setEmial2] = useState(props.extraData.email)
    const [username, setUsername] = useState('')
    const [phoneName, setPhone] = useState('')
    const [phoneName2, setPhone2] = useState(props.extraData.phone)


    
    // extract the firebase database 
    const entityRef = firebase.firestore().collection('users')
    var db = firebase.firestore()
    var userID = props.extraData.id
    var user_name = props.extraData.username
    var phone =  props.extraData.phone


    // updates the firebase database 

  //   handleImageChange = (response) => {
  //     // grab the deisre image
  //     response: {
  //          data; "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // Base64
  //          fileSize; 474486,
  //          height; 531,
  //          isVertical; false,
  //          origURL; "assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG",
  //          uri; "file:///...",
  //          width; 800,
  //     }
  // };

    const saveChangesButtonPress = () => {
      username
        if (FullName.length != 0) {
            db.collection('users').doc(userID).update({
                fullName: FullName,
            })
            setFullname2(FullName)        
        }

        if (emailName.length != 0) {
            db.collection('users').doc(userID).update({
                email: emailName,
            })
            setEmial2(emailName)   
        }

        if (phoneName.length != 0) {
            db.collection('users').doc(userID).update({
                phone: phoneName,
            })
            setPhone2(phoneName)        
        }

        if (username.length != 0) {
            db.collection('users').doc(userID).update({
              username: user_name,
            })        
        }
        const usersRef = firebase.firestore().collection('users')
        

        }
        
    return( 
        
        <SafeAreaView style={styles.container}>

        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>

            <Avatar.Image 
              source={{
                // uri: 'https://cdn.imgbin.com/13/8/22/imgbin-computer-icons-user-profile-avatar-avatar-wZPGBbiFn3VsY4n1ue9VUU024.jpg',
                uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
              }}
              size={80}
            />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop:15,
                marginBottom: 1,
              }]}>{FullName2}</Title>
              <Caption style={styles.caption}>{emailName2}</Caption>
              <Caption style={styles.caption}>{phoneName2}</Caption>
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
                    placeholder="Username"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={(text) => setUsername(text)}
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