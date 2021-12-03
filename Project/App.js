import * as React from 'react';
import { View, Text, TextInput,  Button, StyleSheet, SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
// { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// FormScreen from './screens/FormScreen';
import MenuScreen from './screens/MenuScreen';
import CommunityScreen from './screens/CommunityScreen';
import UserScreen from './screens/UserScreen';
import { LoginScreen } from './screens/LoginScreen';
import comm from "./screens/comm"
import {getDish, addDish, delDish, addImage, getImage, iniDB} from './screens/firebasehelper'

import { Provider } from 'react-redux';
import { Store } from './src/store';
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback} from 'react';
import {db, store} from "./screens/firebasesetup";


import configureStore from './src/store.js';


const Stack = createBottomTabNavigator();


// else if (route.name === 'Submit') {
//   iconName = focused ? 'git-commit' : 'git-commit-outline';
// }
// <Stack.Screen name="Submit" component={FormScreen}/>

const App = () => {

//   iniDB(db, "Juan")
//   addDish(db, "Kate", "Vitamin B")
//   addImage(store, "Roy", "https://media.wired.com/photos/5b899992404e112d2df1e94e/master/pass/trash2-01.jpg", "trashcan")

    return (
    <Provider store={Store}>
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
            }  else if (route.name === 'User') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === "Login") {
              iconName = focused ? 'log-in' : 'log-in-outline';
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
        <Stack.Screen name="Reviews" component={comm}/>
        <Stack.Screen name="User" component={UserScreen}/>
      </Stack.Navigator>
            </NavigationContainer>
        </Provider>
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
