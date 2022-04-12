import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,  FlatList } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../MainScreen/styles';
import { db, auths, firebase } from '../../firebase'
import { useNavigation } from '@react-navigation/core';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

export default function ToolBar({colorStatus}) {
    // colorStatus = [true,true,true]
    const navigation = useNavigation()


    const onMainPress = () => {
        navigation.navigate('Main Menu')
    }

    const onFriendPress = () => {
        navigation.navigate('FriendList')
    }
    const onNomineepress = () => {
        navigation.navigate('Nominee')
    }

    return(
        <View style={[styles.footnote, styles.infoBoxWrapper, {backgroundColor: 10,}]}>
            
            <TouchableOpacity style={{marginRight: 30}} onPress = {() => onMainPress()}>
                    <Text style={{color:colorStatus[0] ? 'gray': 'blue', fontSize: 12}}> 
                        <FontAwesome5Icon name='home' size={30} color={colorStatus[0] ? 'gray': 'blue'}/>
                        {'\n'}
                        Home
                    </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginRight: 0}} onPress = {() => onFriendPress()}>
                <Text style={{color:colorStatus[1] ? 'gray': 'blue', fontSize: 12}}>
                    <Feather name='message-square' size={30} color={colorStatus[1] ? 'gray': 'blue'}/>
                    {'\n'}
                    Friends
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginLeft: 20}} onPress = {() => onNomineepress()}>
                <Text style={{color:colorStatus[2] ? 'gray': 'blue', fontSize: 12}}>
                    <Feather name='file-plus' size={30} color={colorStatus[2] ? 'gray': 'blue'}/>
                    {'\n'}
                    nominee
                </Text>
            </TouchableOpacity>
        </View>
    )    
}
