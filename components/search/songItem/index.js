import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
// import Sound from 'react-native-sound'
import styles from './styles'

export default function SearchSongItem({ item }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={styles.container}>
            {/* // onPress={() => navigation.navigate('SearchProfile', { initialUserId : item.id })}> */}
            <Text style={styles.text}>{item.name}</Text>
            {/* <Image style={styles.image} source={{ uri: item.photoURL }} /> */}
        </TouchableOpacity >
    )
}