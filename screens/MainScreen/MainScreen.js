import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase'
import { useNavigation } from '@react-navigation/core';

export default function MainScreen(props) {

    const userID = props.extraData.id

    const navigation = useNavigation()

    const onLobbyPress = () => {
        navigation.navigate('Lobby')
    }
    const onProfilePress = () => {
        navigation.navigate('Profile')
    }


    return(

        <View style={styles.container}>

            <KeyboardAwareScrollView
            // Logo
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Text style={styles.title}>  Music {'\n'} Royale</Text>
                <Image
                    style={styles.logo}
                    source={require('../../assets/Lobby/Musiclogo.png')} />

                {/* Buttons  */}
                <View style={styles.container}>
                    <TouchableOpacity  style={styles.button} onPress={() => onLobbyPress()}>
                        <Image style={styles.button}
                            source={require('../../assets/Lobby/buttonBackground.png')}/>
                        <Text style={styles.buttontext}>Lobby </Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.button}>
                        <Image style={styles.button}
                            source={require('../../assets/Lobby/buttonBackground.png')}/>
                        <Text style={styles.buttontext}>Search</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.button} onPress = {() => onProfilePress()}>
                        <Image style={styles.button}
                            source={require('../../assets/Lobby/buttonBackground.png')}/>
                        <Text style={styles.buttontext}>Profile</Text>
                    </TouchableOpacity>

                    <Image style={styles.footnote}
                        source={require('../../assets/Lobby/footnote.png')}>
                    </Image>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
    
}