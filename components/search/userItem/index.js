import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'

// searchuseritem function, takes user text input from search bar and displays username and allows navigation to other user profile
export default function SearchUserItem({ item }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('SearchProfile', { initialUserId : item.username })}>
            <Text style={styles.text}>{item.username}</Text>
            <Image style={styles.image} source={{ uri: item.photoURL }} />
        </TouchableOpacity >
    )
}