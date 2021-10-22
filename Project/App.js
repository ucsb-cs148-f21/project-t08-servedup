import * as React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import FormScreen from './screens/FormScreen';
import MenuScreen from './screens/MenuScreen';
import CommunityScreen from './screens/CommunityScreen';
import UserScreen from './screens/UserScreen';
import LoginScreen from "./screens/LoginScreen";


const Stack = createBottomTabNavigator();

const App = () => {
  return (
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
            } else if (route.name === 'Submit') {
              iconName = focused ? 'git-commit' : 'git-commit-outline';
            } else if (route.name === 'User') {
              iconName = focused ? 'people' : 'people-outline';
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
        <Stack.Screen name="Reviews" component={CommunityScreen}/>
        <Stack.Screen name="Submit" component={FormScreen}/>
        <Stack.Screen name="User" component={UserScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
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

export default App;