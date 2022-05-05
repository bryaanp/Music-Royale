import React, { useState, useEffect } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from '../NomineeScreen/styles';
import { db, firebase } from '../../firebase'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';


// paramters
// @name: display the name of the prompt
// @value: dsplay the value of dislike/like bar
export default function PromptSceen({prompt}) { 
    // todo: needs to be modfiy so you can have one element at time to remove or delete. 



    const dislikeOnPress = (name) => {

        db.collection("prompts").where("name", "==", name)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // update the friend list field
                if(doc.exists) {
                    console.log("dislike");
                    db.collection('prompts').doc(doc.id).update({
                        value: firebase.firestore.FieldValue.increment(-1),
                    }, { merge: true });
                }   
            });
        })      
    }

    const likeOnPress = (name) => {

        db.collection("prompts").where("name", "==", name)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // update the friend list field
                if(doc.exists) {
                    console.log("like");
                    db.collection('prompts').doc(doc.id).update({
                        value: firebase.firestore.FieldValue.increment(1),
                    }, { merge: true });
                }   
            });
        })   
    }
        // display prompt
    // task on using a list in order to print out the list of values
    const displayPrompt = (name,value) => {
        var promptsList = []
        promptsList.push(
            <View key={name}  style={[styles.infoBoxWrapper]}>
                <Text>{name} {value} </Text>

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={ () => dislikeOnPress(name)}>
                        <Text style={{color:'red'}}>
                            dislike {"   "} 
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => likeOnPress(name)}>
                        <Text style={{color:'blue'}}>
                            like 
                            
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
        return promptsList
    }

    // todo: needs to incourpate a better imrpove system 
    return(
        // display the prompt screens 
        <View>
            {prompt.map(({id,name,value}) => (
                <View key={name}>
                    {displayPrompt(name,  value)}
                </View>
            )
            )}

        </View>
    )
}