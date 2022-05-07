import React, { useEffect, useState } from 'react'
import {Text, TouchableOpacity, View, SafeAreaView, Image} from 'react-native'
import styles from './styles';
import { db, firebase } from '../../firebase'
import { ScrollView } from 'react-native-gesture-handler';
import PromptSceen from './PromptScreen';
import ToolBar from '../MainScreen/ToolBar';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';

// npm install react-native-vector-icons


export default function NomineeScreen(props) { 
    
    // hooks
    const [promptOffical, setPromptOffical] = useState([])
    const [promptRated, setPromptRated] = useState([])
    const [promptRecent, setPromptRecent] = useState([])
    const [promptUser, setPromtUser] = useState([])

    var username = props.extraData.username;
    const navigation = useNavigation()



    useEffect(() => {
        // Official tab
        db.collection('prompts').where('genre','==','Official').onSnapshot((snapshot) => {
            setPromptOffical(snapshot.docs.map(doc => doc.data()))
        })
        
        // Hightest Rated tab
        db.collection('prompts').orderBy('value','desc').onSnapshot((snapshot) => {
            setPromptRated(snapshot.docs.map(doc => doc.data()))
        })

        // User Content tab
        db.collection('prompts').where('username','==', username).onSnapshot((snapshot) => {
            setPromtUser(snapshot.docs.map(doc => doc.data()))
        })
       
        // Most Recent'
        db.collection('prompts').orderBy('createdBy','asc').onSnapshot((snapshot) => {
            setPromptRecent(snapshot.docs.map(doc => doc.data()))
        })
        }, []
    
        )

        // Generate a new prompt 
        const newPromptOnPress = () => {

            db.collection('users').doc(props.extraData.id).update({
                value: firebase.firestore.FieldValue.increment(1),
            }, { merge: true });

            db.collection('users').doc(props.extraData.id).get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('Document exists on the database');
                    var index = documentSnapshot.get("value");
                    console.log(index)

                    db.collection('prompts').add({
                        name: 'Untitled Prompt ' + index,
                        username: username,
                        createdBy: firebase.firestore.FieldValue.serverTimestamp(),
                        value: 0,
                        questions: [
                            { 
                                Question: 'Question 1',
                                A: '',
                                B: '',
                                C: '',
                                D: '',
                                Answer: 'A'
                            },
                            { 
                                Question: 'Question 2',
                                A: '',
                                B: '',
                                C: '',
                                D: '',
                                Answer: 'A'
                            },
                            { 
                                Question: 'Question 3',
                                A: '',
                                B: '',
                                C: '',
                                D: '',
                                Answer: 'A'
                            },
                        ],
                    }, { merge: true });
                    console.log(index)
                    navigation.navigate('Customize Prompt', {name:'Untitled Prompt ' + index})

                  }
            });
        }

    return(
        /*  Center out the app */
        <SafeAreaView style={[styles.container, { marginBottom: -25 }]}>

                {/* Display prompts */}
                <View>
                    <TouchableOpacity style={styles.button} onPress={newPromptOnPress}>
                        <Image style={[styles.button]} 
                            source={require('../../assets/Lobby/buttonBackground.png')}>
                        </Image>
                        <Text style={styles.buttontext}>
                            Create Prompt
                        </Text>
                        <AntDesign name="checkcircle" style={[styles.buttontext, {left: 80}]} />
                    </TouchableOpacity>

                    <Text style={{alignSelf:'center', marginBottom: 5}}> Categories of Prompts </Text>

                    <ScrollView style={{width:300, alignSelf:'center', height:550}}>
                    <Text style={{alignSelf:'center', marginBottom: 5, marginTop: 5}}> Official </Text>
                    <PromptSceen prompt={promptOffical} index={0} id={username}/>

                    <Text style={{alignSelf:'center', marginBottom: 5, marginTop: 5}}> Highest Rated </Text>
                    <PromptSceen prompt={promptRated} index={1} id={username}/>

                    <Text style={{alignSelf:'center', marginBottom: 5, marginTop: 5}}>  Most Recent </Text>
                    <PromptSceen prompt={promptRecent} index={2} id={username}/>

                    <Text style={{alignSelf:'center', marginBottom: 5, marginTop: 5}}>  {username} Propmts </Text>
                    <PromptSceen prompt={promptUser} index={3} id={username}/>
                    </ScrollView>

                    {/* ToolBar */}
                    <View style={{marginLeft:10}}>
                    <ToolBar colorStatus={[true, true, false]} />
                    </View>
                </View>

        </SafeAreaView>
    )
}
