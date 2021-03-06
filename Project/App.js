import * as React from 'react';
import {StyleSheet} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
// { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// FormScreen from './screens/FormScreen';
import MenuScreen from './screens/MenuScreen';
import UserScreen from './screens/UserScreen';
import { LoginScreen } from './screens/LoginScreen';
import comm from "./screens/comm"

import { Provider } from 'react-redux';
import { Store } from './src/store';


import configureStore from './src/store.js';


const Stack = createBottomTabNavigator();

const App = () => {

    return (
    <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Menu') {
              iconName = focused
                ? 'list-sharp'
                : 'list-outline';
            } else if (route.name === 'Reviews') {
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
            }  else if (route.name === 'User') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === "Login") {
              iconName = focused ? 'log-in' : 'log-in-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
          >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ title: 'Today\'s menu' }}
        />
        <Stack.Screen name="Reviews" component={comm}/>
        <Stack.Screen name="User" component={UserScreen}/>
      </Stack.Navigator>
            </NavigationContainer>
        </Provider>
  );
};

export default App;

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
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray',
},
});
