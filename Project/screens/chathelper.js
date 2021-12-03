import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback} from 'react';
import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from "react-native";

import {db, store} from "./firebasesetup"
import { useSelector, useDispatch} from 'react-redux'


const chathelper = (dininghall) => {
    const [messages, setMessages] = useState([])
    
    const dispatch = useDispatch();
    var disName = useSelector(state => state.loginReducer.name);
    var disEmail = useSelector(state => state.loginReducer.email);
    var disID = useSelector(state => state.loginReducer.id);
    var disState = useSelector(state => state.loginReducer.isSignedIn);
    var disPhotoURL = useSelector(state => state.loginReducer.photoURL);

    const user = {
          name: disName,
          email: disEmail,
          avatar: disPhotoURL,
          id: disID,
          _id: disID, // need for gifted-chat
    };

    useEffect(() => {
      const unsubscribe = dininghall.onSnapshot((querySnapshot) => {
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

  
    async function handleSend(messages) {
      const writes = messages.map(m => dininghall.add(m) )
      await Promise.all(writes)
    }
  
    if (!disState) {
      return (
        <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textStyle}> Use Login Screen to login first </Text>
        </View>
      )
    } else {
        return (
        <View style={styles.container}>
            <GiftedChat messages={messages} user={user} onSend={handleSend} />
        </View>
        )
    }
};

export default chathelper;

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
    textStyle: {
        textAlign: 'center',
        fontSize: 16,
        color: '#000000',
    },
  });