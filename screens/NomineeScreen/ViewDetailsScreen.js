import React, { useEffect, useState } from 'react'
import {Text, View, SafeAreaView} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../../firebase'
import styles from '../NomineeScreen/styles';



export default function ViewDetailsScreen(props) { 


    const [prompt, setPromt] = useState([]);
    const promptName = props.route.params.name;
    const promptRef  =  db.collection('prompts').where('name','==',promptName)
    useEffect(() => {
        promptRef.onSnapshot((snapshot) => {
            setPromt(snapshot.docs.map(doc => doc.data()))
        })


    }, [])


    const testing  = () => {
        console.log(promptName)
        }
    
    
        return(

            <SafeAreaView>
    
                <Text style={styles.Title}> {promptName} </Text>
    
                    <View style={styles.menuBorder}>
    
                        {
                        // prompt has find the object 
                        prompt.map(({name,questions}) => (
                        <View>
                            <ScrollView style={{marginTop: 20, height: 270}}>

                                {questions.map(({Question, A, B, C, D, Answer, index}) => (
                                    <View style={styles.BoxWrapper} key={Question}>
                                        {/* {console.log(index)} */}
                                        <Text style={{alignContent:'center', alignSelf:'center'}}>
                                            {Question}
                                        </Text>
                                        <View style={{flexDirection:'row',  justifyContent: 'center',}}>
                                            <Text> A.{A} </Text>
                                            <Text> B.{B} </Text>
                                            <Text> C.{C} </Text>
                                            <Text> D.{D} </Text>
                                        </View>
                                        <Text style={{alignSelf:'center'}}>
                                            Correct answer: {Answer}
                                        </Text>

                                        </View>
                                )
                                )
                                }
                            </ScrollView>
                        </View>
                        )
                        )
                        }
                        
                    </View>
                    
            </SafeAreaView>
        )
}
