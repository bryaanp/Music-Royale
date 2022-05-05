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


  //   const playSnippet = () => {
  //   const soundObject = new Audio.Sound();
  //   try {
  //      soundObject.loadAsync({ uri });
  //      soundObject.playAsync();
  //   } catch (error) {
  //     console.log("error:", error);
  //   }
  // };
  

const getSong = async () => {
    const songRef = await firebase.storage().ref().child('songs/').listAll();
    const urls = await Promise.all(songRef.items.map((ref) => ref.getDownloadURL()));
    setSearchMusic(urls);
}



// return (
//     <div className="App" style={{ marginTop: 250 }}>
//       <center>
//         <button onClick={listItem}>List Item</button>
//         {
//           searchMusic.map((val) => (
//             <h2>{val}</h2>
//           ))
//         }
//       </center>
//     </div>
//   );


// return (
//   <SafeAreaView style={styles.container}>
//       <TextInput
//           onChangeText={setTextInput}
//           style={styles.textInput}
//           placeholder={'Search Music'}
//           />
//         <button onClick={listItem}>List All Songs</button>
//         <TouchableOpacity>
//           <Text>{searchMusic.map((val) => <div> {val} </div>)}</Text>
//         </TouchableOpacity >
//       </SafeAreaView>
// );

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