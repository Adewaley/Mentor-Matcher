import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import ChatScreen from './Screens/ChatScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import useAuth from './hooks/useAuth';
import ModalScreen from './Screens/ModalScreen';
import MatchedScreen from './Screens/MatchedScreen'
import MessagesScreen from './Screens/MessagesScreen';

const Stack  = createNativeStackNavigator();

const StackNavigator = () => {
    const {user} = useAuth();
    return (
       <Stack.Navigator
       screenOptions={{
        headerShown: false
       }
       }
       >
           {user ? (
               <>
               <Stack.Group>
               <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="Message" component={MessagesScreen} />

               </Stack.Group>
               <Stack.Group screenOptions={{presentation: "modal"}}>
                <Stack.Screen name="Modal" component={ModalScreen} />
               </Stack.Group>
               <Stack.Group screenOptions={{presentation: "transparentModal"}}>
                <Stack.Screen name="Match" component={MatchedScreen} />
               </Stack.Group>
               </>
           ) : (       
           <Stack.Screen name="Login" component={LoginScreen} />
           )}

       </Stack.Navigator>
    )
}

export default StackNavigator
