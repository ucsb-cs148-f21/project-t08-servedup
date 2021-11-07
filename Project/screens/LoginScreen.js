import React from "react";
import { StyleSheet, View, Button } from "react-native";
import * as Google from "expo-google-app-auth";
import * as firebase from 'firebase';

const LoginScreen = ({ navigation }) => {
    const [isAbleLogIn, setAbleLogIn] = React.useState(false);

    const [isAbleLogOut, setAbleLogOut] = React.useState(true);

    const config = {
        expoClientId: `<YOUR_WEB_CLIENT_ID>`,
        iosClientId: `1013730947248-k1drlh72srgq8mgbejeelbj2kq1jknhg.apps.googleusercontent.com`,
        androidClientId: `1013730947248-rr5c6p3vdmno9i1rs0cq1n672kj81usp.apps.googleusercontent.com`,
        iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
        androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
    };

    var accessTokenUser = "";

    const signInAsync = async () => {
        console.log("LoginScreen.js 22 | loggin in");
        try {
            const { type, accessToken, user } = await Google.logInAsync(config);

            if (type === "success") {
                // Then you can use the Google REST API
                console.log("LoginScreen.js 28 | success, navigating to profile");
                console.log("Logging in, username = " + user);
                navigation.navigate("User");
                setAbleLogIn(true);
                setAbleLogOut(false);
                accessTokenUser = accessToken;
                console.log(accessTokenUser);
            }
        }
        catch (error) {
            console.log("LoginScreen.js 37 | error with login", error);
        }
    };


    const signOutAsync = () => {
        console.log("LoginScreen.js 38 | logging out");
        Google.logOutAsync(accessTokenUser, config);
        setAbleLogOut(() => true);
        setAbleLogIn(() => false);

        /*try {
            const { type } = await Google.logOutAsync(accessTokenUser, config);

            if (type === "success") {
                console.log("LoginScreen.js 48 | success, logging out");

                setAbleLogOut(true);
                setAbleLogIn(false);
            }
        }
        catch (error) {
            console.log("LoginScreen.js 55 | error with logout", error);
        }*/

        //};

        return (
            <View style={styles.container}>
                <Button disabled={isAbleLogIn} title="Login with Google" onPress={signInAsync} />

                <Button disabled={isAbleLogOut} title="Logout with Google" onPress={signOutAsync} />

            </View>

        );
    };

    export default LoginScreen;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonContainer: {
            flex: 1,
        }
    }
    );