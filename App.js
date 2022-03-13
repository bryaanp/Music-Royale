import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, SignupScreen, MainScreen, LobbyScreen, ProfileScreen } from './screens'
import { firebase } from './firebase'
import {decode, encode} from 'base-64'
import ForgotPassword from './screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen/ForgotPasswordScreen';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setUser(userData)
            setLoading(false)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'HomeScreen' : 'Login'}>
        <Stack.Screen name="HomeScreen">
          {props => <HomeScreen {...props} extraData={user}/>}
        </Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={SignupScreen} />
        {/* <Stack.Screen name='Main Menu' component={MainScreen}  />  */}
        <Stack.Screen name='Lobby' component={LobbyScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        <Stack.Screen name='Profile'>
        {props => <ProfileScreen {...props} extraData={user}/>}
        </Stack.Screen>
        <Stack.Screen name='Main Menu' >
          {props => <MainScreen {...props} extraData={user}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
