import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, SignupScreen, MainScreen, LobbyScreen, ProfileScreen, FriendScreen, SearchScreen } from './screens'
import { firebase } from './firebase'
import {decode, encode} from 'base-64'
import { Button } from 'react-native-paper';
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
      <Stack.Navigator initialRouteName={user ? 'Main Menu' : 'Login'}>
        { user ?  (
            <>
             <Stack.Screen name="Main Menu" options={{
               headerRight: () => (
                 <Button
                  
                   onPress ={() => {
                     firebase.auth()
                     .signOut()
                     .then(setUser(null))
                   }}
                   title='Logout'
                   color='blue'
                   >
                     Logout
                 </Button>
               ),
             }}>
              {props => <MainScreen {...props} extraData={user}/>}
             </Stack.Screen>
             </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={SignupScreen} />
            {/* <Stack.Screen name="Search" component={SearchScreen} /> */}
          </>
        )}
        <Stack.Screen name="HomeScreen">
          {props => <HomeScreen {...props} extraData={user}/>}
        </Stack.Screen>
        <Stack.Screen name='Lobby'>
          {props => <LobbyScreen {...props} extraData={user}/>}
        </Stack.Screen>

        <Stack.Screen name='Profile'>
        {props => <ProfileScreen {...props} extraData={user}/>}
        </Stack.Screen>

        <Stack.Screen name='Search'>
        {props => <SearchScreen {...props} extraData={user}/>}
        </Stack.Screen>

        <Stack.Screen name='FriendList' >
        {props => <FriendScreen {...props} extraData={user} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
