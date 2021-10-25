// @refresh reset
import * as React from 'react';
import { View, Text, TextInput,  Button, StyleSheet, SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import FormScreen from './screens/FormScreen';
import MenuScreen from './screens/MenuScreen';
import CommunityScreen from './screens/CommunityScreen';
import UserScreen from './screens/UserScreen';
import LoginScreen from "./screens/LoginScreen";

import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback} from 'react';
import * as firebase from "firebase";
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyAGAPiJ4hblg4P4tbExbqdqZVDZKu7Dvw8',
  authDomain: 'served-up-63c2e.firebaseapp.com',
  databaseURL: 'https://served-up-63c2e.firebaseio.com',
  projectId: 'served-up-63c2e',
  storageBucket: 'served-up-63c2e.appspot.com',
  //messagingSenderId: 'sender-id',
  appId: '1:456652905966:ios:80d960e213cb40ea1182ff',
  //measurementId: 'G-measurement-id',
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);

}

const Stack = createBottomTabNavigator();

const db = firebase.firestore();
const reviewRef = db.collection('Reviews');

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Menu') {
              iconName = focused
                ? 'list-sharp'
                : 'list-outline';
            } else if (route.name === 'Reviews') {
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
            } else if (route.name === 'Submit') {
              iconName = focused ? 'git-commit' : 'git-commit-outline';
            } else if (route.name === 'User') {
              iconName = focused ? 'people' : 'people-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
          >

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ title: 'Today\'s menu' }}
        />
        <Stack.Screen name="Reviews" component={CommunityScreen}/>
        <Stack.Screen name="Submit" component={FormScreen}/>
        <Stack.Screen name="User" component={UserScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: 0,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray',
},
});