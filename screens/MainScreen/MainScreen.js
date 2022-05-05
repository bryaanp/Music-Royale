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
        navigation.navigate('SearchMusic')
    }
    const onProfilePress = () => {
        navigation.navigate('Profile')
    }
    const onSearchPress = () => {
        navigation.navigate('Search')
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
                        <Text style={styles.buttontext}>Search Music </Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.button} onPress = {() => onSearchPress()}>
                        <Image style={styles.button}
                            source={require('../../assets/Lobby/buttonBackground.png')}/>
                        <Text style={styles.buttontext}>Search</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.button} onPress = {() => onProfilePress()}>
                        <Image style={styles.button}
                            source={require('../../assets/Lobby/buttonBackground.png')}/>
                        <Text style={styles.buttontext}>Profile</Text>
                    </TouchableOpacity>

                    {/* footnote */}
                    <Image style={styles.footnote}
                        source={require('../../assets/Lobby/footnote.png')}>
                    </Image>
                    <View style={styles.footnote}> 

                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
    
}