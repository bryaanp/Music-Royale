import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,  FlatList, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { db, auths, firebase } from '../../firebase'
import SendMessage from './SendMessage';
import { useNavigation } from '@react-navigation/core';
import { TouchableHighlight } from 'react-native-gesture-handler';


export default function CreateLobby(props) {
    const username = props.extraData.username
    const id = props.extraData.id
    const navigation = useNavigation()
    const [lobbydata, setLobbyData] = useState([])
    const [status, setstatus] = useState(false)
    const [text, setText] = useState('')
    const promptRef = db.collection('Lobby').doc(id)

    const LobbyOnPress = () => {
        console.log(id)
        db.collection('Lobby').doc(id).delete()
        navigation.navigate("Lobby")
      }
    
    const PrivateOnPress = () => {
        setstatus(true)
        console.log(id)
        promptRef.update({
            privacy: true,
        }, { merge: true });
        console.log(status)
        
    }

    const PublicOnPress = () => {
        setstatus(false)
        setText('')
        promptRef.update({
            privacy: false,
            password: '',

        }, { merge: true });
        console.log(status)
    }

    const SubmitOnPress = () => {
        console.log(text)
        promptRef.update({
            password: text,
        }, { merge: true });
    }
    const chatOnPress = () => {
        navigation.navigate("Lobby chat")
      }
    
    useEffect(() => {
    db.collection('Lobby').where("id","==",id).onSnapshot((snapshot) => {
        setLobbyData(snapshot.docs.map(doc => doc.data()))
    })
    }, []

    )

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
        <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={LobbyOnPress}>
                <Text>
                    Closed 
                </Text>
            </TouchableOpacity>

                <View style={{flexDirection:'row'}}>
                    <Text>
                        Privacy: {" "}
                    </Text>
                    <TouchableOpacity  onPress={PublicOnPress}>
                        <Text>
                            public {' '}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={PrivateOnPress}>
                        <Text>
                            private
                        </Text>
                    </TouchableOpacity>
                </View>

                {status ? 
                    <View style={{flexDirection:'row'}}>
                        <Text>
                            Enter a password: {" "}
                        </Text>
                        <TextInput 
                        placeholder={"Text..."} 
                        onChangeText={(text) => setText(text)}
                        value={text}/>
                        <TouchableOpacity onPress={SubmitOnPress}>
                        <Text>
                            Submit
                        </Text>
                        </TouchableOpacity>
                    </View> : 
                    <View>
                        
                </View>}
            
            <TouchableOpacity onPress={chatOnPress}>
                <Text>
                    chat
                </Text>
            </TouchableOpacity>


            <Text>
                Number of player
            </Text>
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