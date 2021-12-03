import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Store from '../src/store';
import { useSelector, useDispatch} from 'react-redux'

import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback} from 'react';
import firebase from "firebase";
import 'firebase/firestore';
import * as Google from 'expo-google-app-auth';

import {getDish, addDish, delDish, addImage, getImage} from './firebasehelper'
import {db, store} from "./firebasesetup"

const carrillo = db.collection('Carrillo');
const dlg = db.collection('De La Guerra')
const ortega = db.collection('Ortega')
const portola = db.collection('Portola')

const Separator = () => (
  <View style={styles.separator} />
);

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Button
          title="Carrillo"
          onPress={() =>
            navigation.navigate('Carrillo Chat')}/>
      </View>
      <Separator />
      <View >
        <Button
          title="De La Guerra"
          onPress={() =>
            navigation.navigate('De La Guerra Chat')}/>
      </View>
      <Separator />
      <View >
        <Button
          title="Ortega"
          onPress={() =>
            navigation.navigate('Ortega Chat')}/>
      </View>
      <Separator />
      <View >
        <Button
          title="Portola"
          onPress={() =>
            navigation.navigate('Portola Chat')}/>
      </View>
    </SafeAreaView>
  );
};
const Carrillo = ({ navigation}) => {

    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])
    
    // currentroom = "Carrillo"
  
    useEffect(() => {
      readUser()
      const unsubscribe = carrillo.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
            .docChanges()
            .filter(({type}) => type === 'added')
            .map(({ doc }) => {
              const message = doc.data()
              //createdAt is firebase.firestore.Timestamp instance
              //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
              return { ...message, createdAt: message.createdAt.toDate()}
            })
            .sort((a, b) => b.createdAt - a.createdAt)
        appendMessages(messagesFirestore)
      })
      return () => unsubscribe()
    }, [])
  
    const appendMessages = useCallback((messages) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, messages))
    }, [messages]) // append current message to previous messages
  
    async function readUser() {
      const user = await AsyncStorage.getItem('user'); 
      if (user) {
        setUser(JSON.parse(user));
      }
    }; // get user name
  
    async function handlePress() {
      const _id = Math.random().toString(36).substring(7);
      var avatar = store.ref().child('Quansen/testing.jpg').getDownloadURL()
      const user = {_id, name, avatar};
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      typeof user == "string" || throwError('username should be type string');
      user || throwError("username should not be an empty string");
    } 
  
    async function handleSend(messages) {
      const writes = messages.map(m => carrillo.add(m) )
      await Promise.all(writes)
    }
  
    if (!user) {
      return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Enter Your Name" value={name} onChangeText={setName} />
            <Button onPress={handlePress} title="Enter the Chat" />
        </View>
      )
    } 
  
    return (
      <View style={styles.container}>
        <GiftedChat messages={messages} user={user} onSend={handleSend} />
      </View>
    )
};


const DeLaGuerra = ({ navigation}) => {

    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])
  
    useEffect(() => {
      readUser()
      const unsubscribe = dlg.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
            .docChanges()
            .filter(({type }) => type === 'added')
            .map(({ doc }) => {
              const message = doc.data()
              //createdAt is firebase.firestore.Timestamp instance
              //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
              return { ...message, createdAt: message.createdAt.toDate()}
            })
            .sort((a, b) => b.createdAt - a.createdAt)
        appendMessages(messagesFirestore)
      })
      return () => unsubscribe()
    }, [])
  
    const appendMessages = useCallback((messages) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, messages))
    }, [messages]) // append current message to previous messages
  
    async function readUser() {
      const user = await AsyncStorage.getItem('user'); 
      if (user) {
        setUser(JSON.parse(user));
      }
    }; // get user name
  
    async function handlePress() {
      const _id = Math.random().toString(36).substring(7);
      const user = {_id, name};
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      typeof user == "string" || throwError('username should be type string');
      user || throwError("username should not be an empty string");
    } 
  
    async function handleSend(messages) {
      const writes = messages.map(m => dlg.add(m) )
      await Promise.all(writes)
    }
  
    if (!user) {
      return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Enter Your Name" value={name} onChangeText={setName} />
            <Button onPress={handlePress} title="Enter the Chat" />
        </View>
      )
    } 
  
    return (
      <View style={styles.container}>
        <GiftedChat messages={messages} user={user} onSend={handleSend} />
      </View>
    )
};


const Ortega = ({ navigation}) => {

    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])
  
    useEffect(() => {
      readUser()
      const unsubscribe = ortega.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
            .docChanges()
            .filter(({type }) => type === 'added')
            .map(({ doc }) => {
              const message = doc.data()
              //createdAt is firebase.firestore.Timestamp instance
              //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
              return { ...message, createdAt: message.createdAt.toDate() }
            })
            .sort((a, b) => b.createdAt - a.createdAt)
        appendMessages(messagesFirestore)
      })
      return () => unsubscribe()
    }, [])
  
    const appendMessages = useCallback((messages) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, messages))
    }, [messages]) // append current message to previous messages
  
    async function readUser() {
      const user = await AsyncStorage.getItem('user'); 
      if (user) {
        setUser(JSON.parse(user));
      }
    } // get user name
  
    async function handlePress() {
      const _id = Math.random().toString(36).substring(7);
      const user = {_id, name};
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      typeof user == "string" || throwError('username should be type string');
      user || throwError("username should not be an empty string");
    } 
  
    async function handleSend(messages) {
      const writes = messages.map(m => ortega.add(m) )
      await Promise.all(writes)
    }
  
    if (!user) {
      return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Enter Your Name" value={name} onChangeText={setName} />
            <Button onPress={handlePress} title="Enter the Chat" />
        </View>
      )
    } 
  
    return (
      <View style={styles.container}>
        <GiftedChat messages={messages} user={user} onSend={handleSend} />
      </View>
    )
};

const Portola = ({ navigation}) => {

    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])
  
    useEffect(() => {
      readUser()
      const unsubscribe = portola.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
            .docChanges()
            .filter(({type }) => type === 'added')
            .map(({ doc }) => {
              const message = doc.data()
              //createdAt is firebase.firestore.Timestamp instance
              //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
              return { ...message, createdAt: message.createdAt.toDate() }
            })
            .sort((a, b) => b.createdAt - a.createdAt)
        appendMessages(messagesFirestore)
      })
      return () => unsubscribe()
    }, [])
  
    const appendMessages = useCallback((messages) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, messages))
    }, [messages]) // append current message to previous messages
  
    async function readUser() {
      const user = await AsyncStorage.getItem('user'); 
      if (user) {
        setUser(JSON.parse(user));
      }
    } // get user name
  
    async function handlePress() {
      const _id = Math.random().toString(36).substring(7);
      const user = {_id, name};
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      typeof user == "string" || throwError('username should be type string');
      user || throwError("username should not be an empty string");
    } 
  
    async function handleSend(messages) {
      const writes = messages.map(m => portola.add(m) )
      await Promise.all(writes)
    }
  
    if (!user) {
      return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Enter Your Name" value={name} onChangeText={setName} />
            <Button onPress={handlePress} title="Enter the Chat" />
        </View>
      )
    } 
  
    return (
      <View style={styles.container}>
        <GiftedChat messages={messages} user={user} onSend={handleSend} />
      </View>
    )
};

const Stack = createNativeStackNavigator();

const comm = () => {
  const dispatch = useDispatch();
    var disName = useSelector(state => state.loginReducer.name);
    var disEmail = useSelector(state => state.loginReducer.email);
    var disID = useSelector(state => state.loginReducer.id);
    var disState = useSelector(state => state.loginReducer.isSignedIn);
    var disPhotoURL = useSelector(state => state.loginReducer.photoURL);
    console.log("disName = " + disName + ", disEmail = " + disEmail + ", disID = " + disID + ", disState = " + disState + ", disPhotoURL = " + disPhotoURL);

  return (
    (disState) ?
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={HomeScreen}
          options={{ headerShown: false}}
        />
        <Stack.Screen name="Carrillo Chat" component={Carrillo}/>
        <Stack.Screen name="De La Guerra Chat" component={DeLaGuerra}/>
        <Stack.Screen name="Ortega Chat" component={Ortega}/>
        <Stack.Screen name="Portola Chat" component={Portola}/>
      </Stack.Navigator>
      : <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.textStyle}>Use Login Screen to login first</Text>
          </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    backgroundColor: "aliceblue"
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    backgroundColor: "aliceblue"
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
});

export default comm;