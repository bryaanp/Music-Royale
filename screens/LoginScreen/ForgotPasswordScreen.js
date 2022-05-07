import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { auth, firebase } from '../../firebase'


export default function ForgotPasswordScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //       if (user) {
    //         navigation.replace("Home")
    //       }
    //     })
    
    //     return unsubscribe
    //   }, [])

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('Main Menu')
                        // uncomment this to go back to old menu from the tutorial
                        // navigation.navigate('HomeScreen', {user}) 
                    })
                    .catch(error => {
                        alert(error)
                    });
            })

            .catch(error => {
                alert(error)
            })
    }

    //Handle Forgot Password
    const onForgotPasswordPress = (email) => 
    {
        firebase.auth().sendPasswordResetEmail(email)
            .then(function (user) {
            alert('Please check your email...')
            }).catch(function (e) {
            console.log(e)
            })
    }

    return (
        <View style={styles.container}>
        <Text> </Text>
        <Text>Enter Email Below. We'll send you a link to help reset your password.</Text>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onForgotPasswordPress(email)}>
                    <Text style={styles.buttonTitle}>Send Email</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}
