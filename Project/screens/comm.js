import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback} from 'react';
import firebase from "firebase";
import 'firebase/firestore';
import * as Google from 'expo-google-app-auth';
import chathelper from "./chathelper"

import {db, store} from "./firebasesetup"
import { useSelector, useDispatch} from 'react-redux'

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
const Carrillo = () => {
    return ( chathelper(carrillo) )
};


const DeLaGuerra = () => {
    return ( chathelper(dlg) )
};


const Ortega = () => {
  return ( chathelper(ortega) )
};

const Portola = () => {
  return ( chathelper(portola) )
};

const Stack = createNativeStackNavigator();

const comm = () => {
  return (
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
  );
};

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
});

export default comm;