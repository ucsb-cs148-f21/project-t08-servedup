import * as React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Store from '../src/store';
import { useSelector, useDispatch} from 'react-redux'

import getName from '../src/Actions/signInStates';

const UserScreen = ({ navigation }) => {
    //console.log(getName() + "hellO!!!");
    const dispatch = useDispatch();
    const disName = useSelector(state => state.loginReducer.name);
    console.log(disName + "hello!!!");
    return <Text>Placeholder for future implementation.</Text>
  }

export default UserScreen