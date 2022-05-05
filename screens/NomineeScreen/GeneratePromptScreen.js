import React, { useEffect, useState } from 'react'
import {Text, TouchableOpacity, View, SafeAreaView, Image} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { db, firebase } from '../../firebase'
import styles from '../NomineeScreen/styles';


export default function GeneratePromptScreen(props) { 

    //  null = new, anything else = edit
    var  _namePrompt = (props.route.params.name  == null) ? 'Untitled Prompt':props.route.params.name, flag = 0;
    console.log(_namePrompt)
    const [namePrompt, setNamePrompt] = useState(_namePrompt)

    var uid = props.extraData.username, n_answer = [], n_question = []; 

    const promptRef  =  db.collection('prompts').where('username','==',uid).where('name','==',namePrompt)
    const [prompt, setPromt] = useState([]);
    const [promptName, setPromtName] = useState(namePrompt);

    const [quest, setQuestion] = useState('')
    const [index, setQuestionIndex] = useState()
    const [ans_A, setAns_A] = useState('')
    const [ans_B, setAns_B] = useState('')
    const [ans_C, setAns_C] = useState('')
    const [ans_D, setAns_D] = useState('')
    const [ans_, setAns_Cor] = useState('')

    const [id, setid] = useState()





    // grabs the desire prompt if edit 

    useEffect(() => {
        promptRef.onSnapshot((snapshot) => {
            setPromt(snapshot.docs.map(doc => doc.data()))
        })


    }, [])


    const updateOnPress = (questions) => {

        if(typeof index == "undefined"){
            console.log('ded')

            return(null)
        }
        if (questions.length <= index) {
            // console.log('Invalid')
            return(null)
        }
        else if (index < 0) {
            // console.log('Invalid')
            return(null)     
        }

        if(typeof prompt == "undefined"){
            promptRef.onSnapshot((snapshot) => {
                setPromt(snapshot.docs.map(doc => doc.data()))
            })
        }

    
    
        

        // console.log("---")
        // console.log(questions[index])
        // console.log("---")

        // console.log(questions[0])
        promptRef.where('questions', 'array-contains', questions[index]).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // update the friend list to remove 'verify' username
                if(doc.exists) {
                    console.log("yes")
                    setid(doc.id.toString())
                }
                else{
                    console.log("no")
                }   
        })})

        console.log(id)
        
        var copied = questions;
        var temp = questions[index];
        
        if(quest.length != 0){
            temp.Question = quest
        }
        if(ans_A.length != 0){
            temp.A = ans_A;
        }
        if(ans_B.length != 0){
            temp.B= ans_B;
        }
        if(ans_C.length != 0){
            temp.C = ans_C;
        }
        if(ans_D.length != 0){
            temp.D = ans_D;
        }
        if(ans_.length != 0){
            temp.Answer = ans_;
        }

        copied[index] = temp;
        const test = copied

        // console.log(questions[index].A)

        db.collection('prompts').doc(id).update({
            questions: test,
        }, { merge: true });

        setQuestion('')
        setAns_A('')
        setAns_B('')
        setAns_C('')
        setAns_D('')
        setAns_Cor('')
    }


    const addOnPress = (questions) => {

        promptRef.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // update the friend list to remove 'verify' username
                if(doc.exists) {
                    // console.log(doc.id)
                    setid(doc.id)
                }
                else{
                    console.log("no")
                }   
        })})


        var temp;
        db.collection('prompts').doc(id).update({
            questions: firebase.firestore.FieldValue.arrayUnion(
                {
                    Question: temp = (quest.length == 0) ?  'Question':quest,
                    A:  ans_A,
                    B: ans_B,
                    C: ans_C,
                    D: ans_D,
                    Answer: ans_A, 
                }
            ),
            

        }, { merge: true });
        setQuestion('')
        setQuestionIndex()
        setAns_A('')
        setAns_B('')
        setAns_C('')
        setAns_D('')
        setAns_Cor('')

    }

    const displayBuuttons = (name, username, questions) => {

        return(
                <View key={username} style={{paddingTop: 10}}>
                    {/* name */}
                    <View style={{flexDirection: 'row'}}>
                        <Text> Prompt Name: {" "}  </Text>
                        <TextInput
                        placeholder={name} 
                        />
                    </View>

        
                    {/* question */}
                    <View style={{flexDirection: 'row'}}>
                        <Text> Question: {" "}  </Text>
                        <TextInput
                        placeholder={"Question.."} 
                        keyboardType= 'number-pad'
                        onChangeText={(quest) => setQuestion(quest)}
                        value = {quest}
                        />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text> Index: {" "}  </Text>
                        <TextInput
                        placeholder={"If update a question.."} 
                        onChangeText={(index) => setQuestionIndex((index - 1))}
                        value = {index}
                        />
                    </View>
                    
                    {/* Potiental answers */}
                    <View style={{flexDirection: 'row'}}>
                        <Text> Answer A: {" "}  </Text>
                        <TextInput
                        placeholder={"text.."} 
                        onChangeText={(ans_A) => setAns_A(ans_A)}
                        value = {ans_A}
                        />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text> Answer B: {" "}  </Text>
                        <TextInput
                        placeholder={"text.."} 
                        onChangeText={(ans_B) => setAns_B(ans_B)}
                        value = {ans_B}
                        />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text> Answer C: {" "}  </Text>
                        <TextInput
                        placeholder={"text.."} 
                        onChangeText={(ans_C) => setAns_C(ans_C)}
                        value = {ans_C}
                        />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text> Answer D: {" "}  </Text>
                        <TextInput
                        placeholder={"text.."} 
                        onChangeText={(ans_D) => setAns_D(ans_D)}
                        value = {ans_D}
                        />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text> Correct Answer: {" "}  </Text>
                        <TextInput
                        placeholder={"Which letter is correct"} 
                        onChangeText={(ans_) => setAns_Cor(ans_)}
                        value = {ans_}
                        />
                    </View>

                    {/* {console.log(questions.length)} */}
                    <View>
                    <ScrollView style={{overflow: 'hidden', height: 270}}>

                        {questions.map(({Question, A, B, C, D, Answer, index}) => (
                            <View style={styles.BoxWrapper}>
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

                    <TouchableOpacity onPress={() => updateOnPress(questions)} style={styles.button2}>
                            <Text style={styles.buttonText2}> Update </Text>
                        </TouchableOpacity>

                    <TouchableOpacity onPress={() => addOnPress(questions)}  style={styles.button2}>
                        <Text style={styles.buttonText2}> Add </Text>
                    </TouchableOpacity>

                    </View>

            </View>
        )
    }

    return(

        <SafeAreaView>

            <Text style={styles.Title}> {promptName} </Text>

                <View style={styles.menuBorder}>

                    {
                        // prompt has find the object 
                        prompt.map(({name,questions, username}) => (
                            <View key={username}>
                                {displayBuuttons(name, username, questions)}
                                {/* {console.log(questions}} */}
                            </View>
                        )
                        )
                    }
                    
                </View>
        </SafeAreaView>
    )
}