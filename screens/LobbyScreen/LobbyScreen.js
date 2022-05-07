import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,  FlatList, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { db, auths, firebase } from '../../firebase'
import SendMessage from './SendMessage';
import { useNavigation } from '@react-navigation/core';


export default function LobbyScreen(props) {
    const username = props.extraData.username
    const id = props.extraData.id
    const navigation = useNavigation()

    const findOnPress = () => {
        navigation.navigate("Find Lobby")
      }

      const mp3OnPress = (id) => {
        navigation.navigate("MP3")
    }

    const createOnPress = () => {
        db.collection('Lobby').doc(id).set({
            id: id,
            player: [username],
            privacy: false,
            password: '',
            name: username + ' Lobby',
            owner: username,
        })
        navigation.navigate("Create Lobby")
    }

    return( 

        <View style={{marginTop: 10}}>
            <TouchableOpacity  onPress={findOnPress}>
                <Text style={{alignSelf: 'center'}}>
                    Find Lobby
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={createOnPress}> 
                <Text style={{alignSelf: 'center'}}>
                    Create Lobby
                </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={mp3OnPress}> 
                <Text style={{alignSelf: 'center'}}>
                    mp3 player
                </Text>
            </TouchableOpacity>

        </View>
        
    )
}
