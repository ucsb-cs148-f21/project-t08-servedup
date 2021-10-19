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
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FormScreen from './screens/FormScreen';
import MenuScreen from './screens/MenuScreen';
import CommunityScreen from './screens/CommunityScreen';

const Separator = () => (
  <View style={styles.separator} />
);

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Button
          title="Submit your feedback"
          onPress={() =>
            navigation.navigate('Submit')
          }
        />
      </View>
      <Separator />
      <View>
      <Button title="View Today's Menus" onPress={() => navigation.navigate('Menu')}/>
      </View>
      <Separator /> 
      <View>
        <Button 
          title="Join our community" onPress={() => navigation.navigate('Community')}
        />
      </View>
    </SafeAreaView>
  );
};
// const FormScreen = ({ navigation}) => {
//   return <Text>This is form screen.</Text>;
// };
// const MenuScreen = ({ navigation}) => {
//   return <Text>Placeholder for menus.</Text>
// }

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={HomeScreen}
          options={{ title: 'Servedup!' }}
        />
        <Stack.Screen name="Submit" component={FormScreen}/>
        <Stack.Screen name="Menu" component={MenuScreen}/>
        <Stack.Screen name="Community" component={CommunityScreen}/>
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