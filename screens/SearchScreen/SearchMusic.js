import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchUserItem from '../../components/search/userItem'
import styles from './styles'
import styles_search from './styles_search'
import { getStorage, ref, listAll } from "firebase/storage";
import { firebase } from '../../firebase'
import { queryMusic } from './user'
import SearchSongItem from '../../components/search/songItem'



// search music function, similar to search user function under searchscreen.js - refer back if needed
// 
const SearchMusic = () => {
    const storage = firebase.storage()
    const [textInput, setTextInput] = useState('')
    const [searchMusic, setSearchMusic] = useState([]);

    useEffect(() => {
      console.log(textInput)
      queryMusic(textInput)
          .then(setSearchMusic)
  }, [textInput])

    const listItem = () => {
        storage.ref().child('songs/').listAll()
        .then(res => {
            res.items.forEach((item) => {
            setSearchMusic(arr => [...arr, item.name]);
            })
        })
        .catch(err => {
            alert(err.message);
        })
        }


  



// utilizies searchsongitem function, similar to searchuseritem function - refer back if needed
return (
  <SafeAreaView style={styles.container}>
      <TextInput
          onChangeText={setTextInput}
          style={styles.textInput}
          placeholder={'Search Music'}
      />
      <FlatList
          data={searchMusic}
          renderItem={({ item }) => <SearchSongItem item={item} />}
          keyExtractor={(item) => item.id}

      />
  </SafeAreaView>
)

    }




export default SearchMusic