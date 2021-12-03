import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback} from 'react';
import * as React from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet, SafeAreaView } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements';

import {db, store} from "./firebasesetup"
import { useSelector, useDispatch} from 'react-redux'
import { getImage } from './firebasehelper';


const chathelper = (dininghall) => {
    const [messages, setMessages] = useState([])
    
    
    const dispatch = useDispatch();
    var disName = useSelector(state => state.loginReducer.name);
    var disEmail = useSelector(state => state.loginReducer.email);
    var disID = useSelector(state => state.loginReducer.id);
    var disState = useSelector(state => state.loginReducer.isSignedIn);
    var disPhotoURL = useSelector(state => state.loginReducer.photoURL);

    const storeRef = store.ref();
    

    // const [URL, setURL] = useState('')
    // useEffect(() => {
    //     storeRef.child(disName+'/profile.png').getDownloadURL()
    //     .then((url) => {
    //     // `url` is the download URL for 'images/stars.jpg'

    //     // This can be downloaded directly:
    //     var xhr = new XMLHttpRequest();
    //     xhr.responseType = 'blob';
    //     xhr.onload = (event) => {
    //       var blob = xhr.response;
    //     };
    //     xhr.open('GET', url);
    //     xhr.send();
    //     setURL(url)
    //   }, [URL])
    // })


    
    const user = {
          name: disName,
          email: disEmail,
          avatar: getImage(db, disName, 'profile.png'),
          id: disID,
          _id: disID, // need for gifted-chat
    };

    console.log("avatar is: " + user.avatar)

    useEffect(() => {
      setMessages([
        {
          _id: 1, 
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id:2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])

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


    const renderSend = (props) => {
      return (
        <Send {...props}>
          <View>
            <MaterialCommunityIcons
              name="send-circle"
              style={{marginBottom: 5, marginRight: 5}}
              size={32}
              color="#2e64e5"
            />
          </View>
        </Send>
      );
    };
  
    const renderBubble = (props) => {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#2e64e5',
            },
          }}
          textStyle={{
            right: {
              color: '#fff',
            },
          }}
        />
      );
    };

    const renderAvatar = (props) => {
      return (
        <View> 
        {...props}
          <Avatar rounded source={{uri: user.avatar}} />
        </View>
      )
    }

    const scrollToBottomComponent = () => {
      return(
        <FontAwesome name='angle-double-down' size={22} color='#333' />
      );
    }
    
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
            <GiftedChat  
              messages={messages} 
              user={user} 
              onSend={handleSend} 
              renderBubble={renderBubble}
              alwaysShowSend  
              renderSend={renderSend}
              scrollToBottom
              scrollToBottomComponent={scrollToBottomComponent}
              showUserAvatar = {true}
              renderAvatar = {renderAvatar}
            />
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