import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,  FlatList } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { db, auths, firebase } from '../../firebase'


export default function SendMessage() {
  const entityRef = firebase.firestore().collection('messages')
  const [msg, setmesg] = useState('')
  const {uid} = auths.currentUser


  async function sendMessages(e) {
    e.perventDefault()
    const {uid} = auths.currentUser
  
    await db.collection('messages').add({
        text: msg,
        uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).catch((error) => {
      alert(error)
    });
    setmesg('')
  }


const onAddButtonPress = () => {
  if (msg && msg.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
          text: msg,
          createdAt: timestamp,
      };
      entityRef
          .add(data)
          .then(_doc => {
              setEntityText('')
              Keyboard.dismiss()
          })
          .catch((error) => {
              alert(error)
          });
  }
}

  
  return (
    <View style={{marginTop: 280, marginLeft: 5}}>
      <TextInput value={msg} onChange={(e) => setmesg(e.target.value)} placeholder="type message.." >
            </TextInput>
            <TouchableOpacity style={styles.button} onPress={addOnPress}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

    </View>
  )

}
