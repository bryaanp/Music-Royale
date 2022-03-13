import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,  FlatList, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { db, auths, firebase } from '../../firebase'
import SendMessage from './SendMessage';

export default function LobbyScreen(props) {
    const fullName = props.extraData.fullName
    const [messages, setMessages] = useState([])
    const [friend, setFriend] = useState([])
    const [msg, setmesg] = useState('')

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(25).onSnapshot((snapshot) => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    useEffect(() => {
    db.collection('friends').orderBy('friendOneName').onSnapshot((snapshot) => {
        setFriend(snapshot.docs.map(doc => doc.data()))
    })
    }, [])

    const addOnPress = () => {
        db.collection('messages').add({
          id: fullName,
          text: msg,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setmesg('')
      }

    return( 
        <SafeAreaView style={styles.container}>
            <Text style={[styles.Title, {marginTop: 10, marginBottom: 10, alignSelf: 'center'}]}> 
                Lobby Name 
            </Text>

            <View style={styles.infoBoxWrapper}>
                <View style={{marginTop: 5, position: 'absolute', left: 10}}>
                    <Text style={styles.caption}> 
                        Lobby Users
                    </Text>

                    <View style={{marginTop: 5}}>
                        <Text>1. {fullName}</Text>
                        {/* Todo: develop a  invite function */}
                        <Text>2. James</Text>
                        <Text>3. Empty</Text>
                        <Text>4. Empty</Text>
                    </View>

                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    Invite Friend
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    Lobby setting
                </Text>
            </TouchableOpacity>

                <Text style={[styles.caption, {marginTop: 10, marginBottom: 10, alignSelf: 'center'}]}> 
                    Chat Box 
                </Text>
            
            <View style={styles.menuWrapper}>
                {messages.map(({id, text, photoURL}) => (
                    <View key={id} style={{alignItems: 'center'}}>
                        {/* <img src={photoURL} alt=""/> */}
                        <Text>{id} : {text}</Text>
                    </View>
                    ))}
            
            <View>
                <TextInput
                placeholder="Type message.."
                onChangeText={(text) => setmesg(text)}
                style={{left: 10}}
                />
                <TouchableOpacity onPress={addOnPress} style={styles.button}>
                    <Text style={styles.buttonText}> Submit</Text>
                </TouchableOpacity>
            </View>
        

                {/* <SendMessage>

                </SendMessage> */}
            </View>

        </SafeAreaView>
        

        
    )
}

