import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,  FlatList, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { db, auths, firebase } from '../../firebase'
import SendMessage from './SendMessage';
import { useNavigation } from '@react-navigation/core';



export default function Legacy(props) {
    const fullName = props.extraData.fullName
    const [messages, setMessages] = useState([])
    const [msg, setmesg] = useState('')

    useEffect(() => {
        db.collection('messages').orderBy('createdAt','desc').limit(10).onSnapshot((snapshot) => {
            setMessages(snapshot.docs.map(doc => doc.data()))
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
            
            <View style={[styles.menuWrapper, {height:200}]}>
                {messages.map(({id, text, createdAt}) => (
                    <View key={createdAt} style={{alignItems: 'center'}}>
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
