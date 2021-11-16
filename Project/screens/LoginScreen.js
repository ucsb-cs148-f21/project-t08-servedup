import React from "react";
import { StyleSheet, View, Button } from "react-native";
import * as Google from "expo-google-app-auth";
import * as firebase from 'firebase';

export default function LoginScreen ({ navigation }) {
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
        console.log("LoginScreen.js 6 | loggin in");
        try {
            const { type, accessToken } = await Google.logInAsync(config);

            if (type === "success") {
                // Then you can use the Google REST API
                console.log("LoginScreen.js 17 | success, navigating to profile");
                navigation.navigate("User");
                setAbleLogIn(true);
                setAbleLogOut(false);
                accessTokenUser = accessToken;
                console.log(accessTokenUser);
            }
        }
        catch (error) {
            console.log("LoginScreen.js 19 | error with login", error);
        }
    };


    const signOutAsync = async () => {
        console.log("LoginScreen.js | logging out");

            /*await Google.logOutAsync({
                accessTokenUser,
                config
            });*/

            setAbleLogOut(true);
            setAbleLogIn(false);

    };

    return (
        <View style={styles.container}>
            <Button disabled={isAbleLogIn} title="Login with Google" onPress={signInAsync} />

            <Button disabled={isAbleLogOut} title="Logout with Google" onPress={signOutAsync} />
            
        </View>
        //<Button logOutButton={logOutDisable} title="Logout" onPress={signOutAsync} />
        
    );
};

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
