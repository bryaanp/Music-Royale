import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,  FlatList, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { db, auths, firebase } from '../../firebase'
import SendMessage from './SendMessage';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import ToolBar from '../MainScreen/ToolBar';
import { AntDesign } from '@expo/vector-icons'; 


export default function LobbyScreen(props) {
    const userID = props.extraData.username
    const [lobbydata, setLobbyData] = useState([])
    const navigation = useNavigation()
    const [text, setText] = useState('')



    
    useEffect(() => {
        db.collection('Lobby').onSnapshot((snapshot) => {
            setLobbyData(snapshot.docs.map(doc => doc.data()))
        })
        }, []
        )

    const joinOnPress = (id) => {
        db.collection("Lobby").doc(id).update({
            player: firebase.firestore.FieldValue.arrayUnion(userID)
        })
        navigation.navigate("View Lobby", {docID:id, id:userID})
    }

    const checkOnPress = (id) => {
        db.collection("Lobby").doc(id).get()
        .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
                console.log('Document exists on the database');
                 if ( text == documentSnapshot.get("password")){
                     joinOnPress(id)
                 }
                else{
                    console.log('incorrect password')
                }

              }
        });
        
    }

    const display = (id, player, name, privacy) => {
 
            return(
                <View style={[styles.infoBoxWrapper2,{alignSelf:'center', marginBottom: 10, marginTop: 10}]}>

                    {privacy ? 

                    <View style={{alignItems:'center'}}>
                        <Text style={styles.caption}> {name} {player.length}/4 </Text>
                        
                        <View style={{flexDirection:'row'}}>
                            <Text>
                                Enter password:
                            </Text>
                            <TextInput 
                            placeholder={"Text..."} 
                            onChangeText={(text) => setText(text)}
                            value={text}/>
                        </View>

                        <TouchableOpacity onPress={() => checkOnPress(id)} style={{flexDirection:'row'}}>
                            <Text> Submit </Text>
                            <AntDesign name="lock1" size={15} color="black" />
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity onPress={() => joinOnPress(id)}>
                        <Text style={styles.caption}> {name} {player.length}/4 </Text>
                    </TouchableOpacity>}


                </View>
            )
        }

    return(
        <SafeAreaView>
            <Text  style={[styles.Title, {alignSelf:'center', marginTop: 10}]}> Lobby found: {lobbydata.length} </Text>

            <ScrollView style={{height: 575}}>
                {lobbydata.map(({name, player, id, privacy}) => (
                    <View key={id}>
                        {display(id, player, name, privacy)}
                    </View>
                ))
                }
            </ScrollView>

            <ToolBar colorStatus={[true,true,true]}/>     
        </SafeAreaView>
    )
}