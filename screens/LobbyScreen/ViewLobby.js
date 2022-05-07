import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,  FlatList, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { db, auths, firebase } from '../../firebase'
import SendMessage from './SendMessage';
import { useNavigation } from '@react-navigation/core';


export default function ViewLobby(props) {
    const docID = props.route.params.docID
    const id = props.route.params.id
    const [lobbydata, setLobbyData] = useState([])

        
    useEffect(() => {
        db.collection('Lobby').where("id","==",docID).onSnapshot((snapshot) => {
            setLobbyData(snapshot.docs.map(doc => doc.data()))
        })
        }, [])
    
    const navigation = useNavigation()

    const LobbyOnPress = () => {
        db.collection('Lobby').doc(docID).update({
            player: firebase.firestore.FieldValue.arrayRemove(id)
        })
        navigation.navigate("Lobby")
      }

    const chatOnPress = () => {
    navigation.navigate("Lobby chat")
    }

    const players = (player) => {
        var size = player.length
        var myloop = [];
        for (let i = 0; i < size; i++) {
            myloop.push(
                <View key={i}>
                    <Text>
                        {(i+1)}: {player[i]}
                    </Text>
                </View>

            )
        }

        return myloop;
    }


    return(
        <View>
            <TouchableOpacity onPress={LobbyOnPress}>
                <Text>
                    Leave 
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={chatOnPress}>
                <Text>
                    chat
                </Text>
            </TouchableOpacity>

            <View style={{alignSelf:'center'}}>
                {lobbydata.map(({id,player}) => (
                    <View key={id}>
                        <Text style={styles.Title}>Player in the Lobby </Text>
                        {players(player)}
                    </View>
                ))
                }       
            </View>

        </View>
    )
}