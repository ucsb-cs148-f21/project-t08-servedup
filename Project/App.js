// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.bluetext}>Hello world</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
// //<Text style={styles.bluetext}>World!!</Text>
// const styles = StyleSheet.create({
//   container: {
//     flex: 2,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   bluetext: {
//     color:'blue',
//   },
// });

// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// function DetailsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//     </View>
//   );
// }

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

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

// const Separator = () => (
//   <View style={styles.separator} />
// );

// const HomeScreen = ({ navigation }) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <View >
//         <Button
//           title="Submit your feedback"
//           onPress={() =>
//             navigation.navigate('Submit')
//           }
//         />
//       </View>
//       <Separator />
//       <View>
//       <Button title="View Today's Menus" onPress={() => navigation.navigate('Menu')}/>
//       </View>
//       <Separator /> 
//       <View>
//         <Button 
//           title="Join our community" onPress={() => navigation.navigate('Community')}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

const Stack = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
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