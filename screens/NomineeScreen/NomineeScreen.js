import React, { useEffect, useRef, useState } from 'react'
import {Text, TouchableOpacity, View, SafeAreaView, } from 'react-native'
import styles from './styles';
import { useNavigation } from '@react-navigation/core';
import { db, firebase } from '../../firebase'
import { ScrollView } from 'react-native-gesture-handler';
// import PromptSceen from './PrompScreen';
import ToolBar from '../MainScreen/ToolBar';

// added a picker module to allow cathegory to be pick
// yarn add @react-native-picker/picker
import {Picker} from '@react-native-picker/picker';

export default function NomineeScreen(props) { 

    const promptRef =  db.collection('prompts')
    const [prompts, setPrompt] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('Official');



    // initial value
    useEffect(() => {
        db.collection('prompts').where('genre','==',selectedCategory).onSnapshot((snapshot) => {
            setPrompt(snapshot.docs.map(doc => doc.data()))
        })
        }, []
    
        )


    const displayTestingKit = () => {

        promptRef.doc('wpnrarDyNTCh5zg1SULU').update({
            value: firebase.firestore.FieldValue.increment(-1),
          }, { merge: true });
    

        }
    
    const displayTestingKit2 = () => {

        promptRef.doc('wpnrarDyNTCh5zg1SULU').update({
            value: firebase.firestore.FieldValue.increment(1),
            }, { merge: true });
        }
    

    // mow it working
    const displayPrompt = (itemValue) => {
        setSelectedCategory(itemValue)
        setPrompt([])
        db.collection('prompts').where('genre','==',itemValue).orderBy('value','desc').onSnapshot((snapshot) => {
            setPrompt(snapshot.docs.map(doc => doc.data()))
        })

    }


    return(
        <SafeAreaView style={[styles.container, { marginBottom: -25 }]}>

            {/*  Center out the app */}
            <View style={{ alignSelf: 'center',}} >

                {/* Setting up the categoory bar */}
                <Text> 
                    Please Select a category {selectedCategory}
                </Text>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) =>
                        displayPrompt(itemValue, itemIndex)
                    }>
                    <Picker.Item label="Offical" value="Official" /> 
                    <Picker.Item label="Hightest Rated" value="Hightest Rated" />
                    <Picker.Item label="Most Recent" value="Most Recent" />

                </Picker>

                {/* Display prompts */}
                <ScrollView>
                    <PromptSceen prompt={prompts}/>
                </ScrollView>

                {prompts.map(({id,name,value}) => (
                <View key={name}>
                    <Text>
                   {name} {value}
                   </Text>
                </View>
            )
            )}
                {/* <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={displayTestingKit}>
                        <Text style={{color:'red'}}>
                            dislike {"   "} 
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={displayTestingKit2}>
                        <Text style={{color:'blue'}}>
                            like 
                            
                        </Text>
                    </TouchableOpacity>
                </View> */}

                {/* <Image style={styles.button} 
                    source={require('../../assets/Lobby/buttonBackground.png')}/> */}
            <ToolBar colorStatus={[true, true, false]} />
            </View>
        </SafeAreaView>
    )
}