import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchUserItem from '../../components/search/userItem'
import { queryUsers } from './user'
import styles from './styles'

// search screen, displays search bar and takes user input through search bar
const SearchScreen = () => {
    const [textInput, setTextInput] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    // on use, take user text input and query users through function  seen in ./user
    useEffect(() => {
        console.log(textInput)
        queryUsers(textInput)
            .then(setSearchUsers)
    }, [textInput])

    // return user text input, pass into SearchUserItem function to allow for further navigation and listing
    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                onChangeText={setTextInput}
                style={styles.textInput}
                placeholder={'Search User'}
            />
            <FlatList
                data={searchUsers}
                renderItem={({ item }) => <SearchUserItem item={item} />}
                keyExtractor={(item) => item.id}

            />
        </SafeAreaView>
    )
}

export default SearchScreen