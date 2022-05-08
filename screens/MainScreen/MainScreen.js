import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { useNavigation } from '@react-navigation/core';
import ToolBar from './ToolBar';


export default function MainScreen(props) {

    const userID = props.extraData.id

    const navigation = useNavigation()

    const onLobbyPress = () => {
        navigation.navigate('Lobby')
    }
    const onProfilePress = () => {
        navigation.navigate('SearchMusic')
    }
    const onSearchPress = () => {
        navigation.navigate('Search')
    }


    return(

        // <View style={styles.container}>

            <SafeAreaView
            // Logo
                style={{ flex: 1, width: '100%', marginBottom: -25}}
                keyboardShouldPersistTaps="always">
                <View style={styles.container}>

                <Text style={styles.title}>  Music {'\n'} Royale</Text>
                <Image
                    style={styles.logo}
                    source={require('../../assets/Lobby/Musiclogo.png')} />

                {/* Buttons  */}
                {/* <View style={styles.container}> */}
                    <TouchableOpacity  style={styles.button} onPress={() => onLobbyPress()}>
                        <Image style={styles.button}
                            source={require('../../assets/Lobby/buttonBackground.png')}/>
                        <Text style={styles.buttontext}>Lobby </Text>
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



                    {/* Called the toolbar screen  */}
                    <ToolBar colorStatus={[false,true,true]}/>

                    {/* footnote
                    <Image style={styles.footnote}
                        source={require('../../assets/Lobby/footnote.png')}>
                    </Image>
                    <View style={styles.footnote}> 
                    </View> */}
                </View>
            </SafeAreaView>
        // </View>
    )
    
}