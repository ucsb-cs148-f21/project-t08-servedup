import React from "react";
import { StyleSheet, View, Button, Image, Text } from "react-native";
import * as Google from "expo-google-app-auth";
import * as firebase from 'firebase';
import loginReducer from '../src/Reducers/loginReducer';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setSignInState, setName, setPhotoURL, setEmail, setID } from '../src/Actions/types'

import changeSignInOut from '../src/Actions/signInStates';

import Store from '../src/store';

import {iniDB} from './firebasehelper'
import {db, store} from './firebasesetup'

//default function LoginScreen({ navigation }) {
export function LoginScreen({ navigation }) {

    const { name, isSignedIn, id, email, photoURL } = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();

    const [isAbleLogIn, setAbleLogIn] = React.useState(false);

    const [isAbleLogOut, setAbleLogOut] = React.useState(true);

    const config = {
        expoClientId: `<YOUR_WEB_CLIENT_ID>`,
        iosClientId: `1013730947248-k1drlh72srgq8mgbejeelbj2kq1jknhg.apps.googleusercontent.com`,
        androidClientId: `1013730947248-rr5c6p3vdmno9i1rs0cq1n672kj81usp.apps.googleusercontent.com`,
        iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
        androidStandaloneAppClientId: `1013730947248-p7ol733de1v9qn5152q4ooslonqff1ek.apps.googleusercontent.com`,
    };
    var accessTokenUser = "";
    const signInAsync = async () => {
        console.log("LoginScreen.js 34 | loggin in");
        try {
            const { type, accessToken, user} = await Google.logInAsync(config);

            if (type === "success") {
                // Then you can use the Google REST API
                console.log("LoginScreen.js 40 | success, navigating to profile");
                
                setAbleLogIn(true);
                setAbleLogOut(false);
                accessTokenUser = accessToken;
                var userName = user.name;
                var userEmail = user.email;
                var userID = user.id;
                var userPhotoURL = user.photoUrl;
                var signInState = true;
                dispatch(setName(userName));
                dispatch(setSignInState(signInState));
                dispatch(setID(userID));
                dispatch(setEmail(userEmail));
                dispatch(setPhotoURL(userPhotoURL));

                iniDB(db, userName);
                navigation.navigate("User");
            }
        }
        catch (error) {
            console.log("LoginScreen.js 19 | error with login", error);
        }
    };


    const signOutAsync = async () => {
        console.log("LoginScreen.js | logging out");
            setAbleLogOut(true);
            setAbleLogIn(false);
            dispatch(setSignInState(false));
            

    };

    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 30, color: "white", textAlign: "center", backgroundColor: "black" }} > Welcome to ServedUp!</Text>

            <Text style={{ fontSize: 20, color: "black", textAlign: "center", backgroundColor: "white" }} > Please sign in below using a UCSB account</Text>

            <View style={{flex: 0.2}} />

            <Button style={[styles.buttonContainer, { backgroundColor: "white" }]} disabled={isAbleLogIn} title="Login with Google" onPress={signInAsync} />

            <View style={{ flex: 0.1 }} />

            <Button style={styles.buttonContainer} disabled={isAbleLogOut} title="Logout with Google" onPress={signOutAsync} />

            <View style={{ flex: 0.2 }} />

            <Image source={require('../assets/serveduplogo.png')} style={{ width: 380, height: 380, alignSelf: "center" }} />
            
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "aliceblue"
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
    },
    box: {
        width: 100,
        height: 100
    }
}
);


