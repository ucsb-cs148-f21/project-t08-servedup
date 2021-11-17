import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback} from 'react';

const chatHelp = ({ navigation}) => {

    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])
  
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
      const user = {_id, name};
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

export default {chatHelp}