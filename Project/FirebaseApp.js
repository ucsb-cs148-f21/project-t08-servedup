import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import firestore from '@react-native-firebase/firestore'



class FirebaseApp extends Component {
    constructor(props) {
            super(props);
            this.getUser();
    }
    getUser = async() => {
        const userDocument = await firestore().collection('users').doc
        ('rN9oJps3LiUFDZWFIM9d').get()
        console.log()
    }
    render() {
        return (
            <View>
                <Text> Firebase App </Text>
            </View>
        )
    }
}

export default FirebaseApp 