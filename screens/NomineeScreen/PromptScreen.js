import React, { useState, useEffect } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { db, firebase } from '../../firebase'
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome, Feather, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';




// paramters
// @name: display the name of the prompt
// @value: dsplay the value of dislike/like bar
export default function PromptSceen({prompt,index, id}) { 
    // todo: needs to be modfiy so you can have one element at time to remove or delete. 


    const navigation = useNavigation()

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
    // @name String name contains the prompt name 
    // @value int 
    const displayPrompt = (name,value, username) => {
        var promptsList = []
        promptsList.push(
            // display the UI of the box
            <View key={name}  style={[styles.infoBoxWrapper]}>
                
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <FontAwesome name="image" size={75} color="black"/>
                    <Text style={styles.Caption}> Q:#</Text>
                </View>

                <Text style={styles.Caption}>{name}</Text>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={ () => likeOnPress(name)}>
                        <Feather name="thumbs-up" size={24} color="blue" />  
                    </TouchableOpacity>
                    {counterColor(value)}
                    <TouchableOpacity onPress={() => dislikeOnPress(name)}>
                        <Feather name="thumbs-down" size={24} color="red" />  
                    </TouchableOpacity>
                    <View style={{marginLeft: 0}}>
                        <Entypo name="dots-three-vertical" size={24} color="gray" onPress={ () => detailsOnPress(name, username)} />
                    </View>
                </View>
            </View>
        )
        return promptsList
    }

    const counterColor = (value) => {
        var flag = false
        if(value > 0){
            flag = true;
        }
        return <Text style={{fontSize:22, color:flag?'red':'green'}}> {value} </Text>
    }

    const detailsOnPress = (name, username) => {
        if(id == username){
            // allow customization (owner)
            console.log("here")
            console.log(name)
            navigation.navigate('Customize Prompt', {name:name})
        }
        else{
            // display details (non-owner)
            navigation.navigate('Details', {name:name})
        }
    }

    return(
        // display the prompt screens 
        <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} persistentScrollbar={false}>
                {prompt.map(({id,name,value, username}) => (
                    <View key={name}>
                        {displayPrompt(name,  value, username)}
                    </View>
                )
                )}
            </ScrollView>
        </View>
    )
}

