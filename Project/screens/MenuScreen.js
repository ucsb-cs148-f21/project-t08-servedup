import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, SectionList, Button, Alert, TouchableOpacity } from 'react-native';
import SwitchSelector from "react-native-switch-selector";

import Store from '../src/store';
import { useSelector, useDispatch} from 'react-redux'

import firebase from "firebase";
import 'firebase/firestore';
import {getDish, addDish, delDish} from './Menuscreenhelper'

function MenuScreen({ navigation }) {

    const firebaseConfig = {
        apiKey: 'AIzaSyAGAPiJ4hblg4P4tbExbqdqZVDZKu7Dvw8',
        authDomain: 'served-up-63c2e.firebaseapp.com',
        databaseURL: 'https://served-up-63c2e.firebaseio.com',
        projectId: 'served-up-63c2e',
        storageBucket: 'served-up-63c2e.appspot.com',
        //messagingSenderId: 'sender-id',
        appId: '1:456652905966:ios:80d960e213cb40ea1182ff',
        //measurementId: 'G-measurement-id',
    };

    // get fav dishes list from database
    const [favList, setFavList] = useState([]);
    const [buttonC = '#90CAF9', setButtonC] = useState();
    // if (disState) {
    //     if (firebase.apps.length === 0) {
    //         firebase.initializeApp(firebaseConfig);
    //     }
        
    //     const db = firebase.firestore();
    //     var ppl = db.collection('Users').doc(disName);

    //     favList = getDish(ppl);
    // }

    /* ============================= Variables ============================= */
    
    // Current date
    const date = new Date();
    const today = `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()}`;
    // Codes of dining halls and meal hours: for API calls
    const hallCodes = [ "carrillo", "de-la-guerra", "ortega", "portola" ];
    const hourCodes = [ "breakfast", "brunch", "lunch", "dinner" ];
    // Base URL and API key
    const baseUrl = "https://api.ucsb.edu/dining/menu/v1/";
    const apiKey = "S7Onov28BCmMrMbIWfh4rGRvg2Uc3F6I";
    // The options of dining halls, meal hours and food filters: for switch selectors
    var hallOptions = [
        { label: "Carrillo", value: "0" },
        { label: "De La Guerra", value: "1" },
        { label: "Ortega", value: "2" },
        { label: "Portola", value: "3" } ];
    var hourOptions = [
        { label: "Breakfast", value: "0" },
        { label: "Lunch", value: "1" },
        { label: "Brunch", value: "2" },
        { label: "Dinner", value: "3" } ];
    var filterOptions = [
        { label: "All", value: "0" },
        { label: "Vegetarian", value: "1" },
        { label: "Vegan", value: "2" },
        { label: "WITH Nuts", value: "3" } ];
    // Array of food filter strings to find specific menu items: for processing data
    const filterStrings = ['(v)', '(vgn)', '(w/nuts)'];
    
    // State variables to store data fetched from API
    // Each element is a JSON object with keys 'name' and 'station.'
    const [ breakfastJson, setBreakfastJson ] = useState([]); // Breakfast data
    const [ lunchJson, setLunchJson ] = useState([]); // Lunch data
    const [ brunchJson, setBrunchJson ] = useState([]); // Brunch data
    const [ dinnerJson, setDinnerJson ] = useState([]); // Dinner data
    
    // State variables to store the choices selected by switch selectors
    const [ hourChoice, setHourChoice ] = useState(0); // Meal hour choice
    const [ hallChoice, setHallChoice ] = useState(0); // Dining hall choice
    const [ filterChoice, setFilterChoice ] = useState(0); // Food filter choice
    
    /* ============================= Functions ============================= */
    
    // Fetch the menu data for a specified hour and store in a specified state variable.
        // hourIndex: an integer (0 <= i <= 3) to be the index of the hourCodes
        // setState: the setState function for a state variable
    const getMenuData = ( hourIndex, setState ) => {
        var inputs = [];
        for (var i = 0; i < hallCodes.length; i++) {
            inputs.push(fetch( baseUrl + today + '/' + hallCodes[i] + '/' + hourCodes[hourIndex],
                               { headers: { "ucsb-api-key": apiKey }}))
        }
        Promise.all(inputs)
            .then(responses => { return Promise.all(responses.map(r => r.json())); })
            .then(jsons => { setState(jsons); })
            .catch(error => { console.log(error); })
    }
    
    // Process the data to make it usable for the display as a sectionList.
        // state: the state variable which contains the menu data
    const processData = (state) => {
        var result = [];
        for (var i = 0; i < state.length; i++) {
            // state[i] contains menu data if it is an array (of objects).
            if ( Array.isArray(state[i]) ) {
                // Create the array of arrays of objects from the menu data.
                // menus[0] = all menus, menus[1] = menus with (v),
                // menus[2] = menus with (vgn), menus[3] = menus with (w/nuts)
                var menus = [[], [], [], []];
                
                // Push each menu item in the array, menus, with its section information.
                for (var j = 0; j < state[i].length; j++) {
                    var pair = Object.values(state[i][j]);
                    addElement(menus[0], pair);
                    
                    // Push the menu item if its name has a food filter string.
                    for (var k = 1; k < menus.length; k++) {
                        if (pair[0].includes(filterStrings[k - 1])) {
                            addElement(menus[k], pair);
                        }
                    }
                }
                // If the menu contains no vegetarian, vegan, or nuts item,
                // store the message section that tells no result to display.
                for (var l = 1; l < menus.length; l++) {
                    if (menus[l] == 0) {
                        menus[l].push({ title: "No Item", data: [], });
                    }
                }
                
                result.push(menus);
            } else {
                // state[i] contains an object to represent the meal is not served.
                if (state[i].status == 404 ) {
                    var message = "Closed"
                } else { // state[i] contains an object to represent some error.
                    var message = "Error";
                }
                createNoDataElement(result, message);
            }
        }
        return result;
    }
    
    // Store an menu name in the array inside the object which stores its section name.
        // dataList: 1-D array to store the menu data
        // pairData: pairData[0] = string for menu name, pairData[1] = string for section name
    const addElement = (dataList, pairData) => {
        if ((dataList.length == 0) || (dataList[dataList.length - 1].title != pairData[1])) {
            dataList.push({ title: pairData[1], data: [], });
        }
        dataList[dataList.length - 1].data.push(pairData[0]);
    }
    
    // Store the message section that tells closed or error.
        // dataList: Array to srore the message.
        // message: string to tell closed or error.
    const createNoDataElement = (dataList, message) => {
        dataList.push([[{ title: message, data: [], }], [{ title: message, data: [], }],
                       [{ title: message, data: [], }], [{ title: message, data: [], }]]);
    };

    // database and sync related variables
    const dispatch = useDispatch();
    var disName = useSelector(state => state.loginReducer.name);
    var disEmail = useSelector(state => state.loginReducer.email);
    var disID = useSelector(state => state.loginReducer.id);
    var disState = useSelector(state => state.loginReducer.isSignedIn);
    var disPhotoURL = useSelector(state => state.loginReducer.photoURL);

    function HandleFavFood(name) {
        if (disState) {
            if (favList.some(fav => fav.item === name.item) === false) {
                Alert.alert("Added to the favorite list");
                console.log(name);
                setFavList([...favList, name]);
                console.log(favList);
                setButtonC('#90CAF9');
            } else {
                Alert.alert("Removed from the favorite list");
                console.log(name);
                setFavList(favList.filter(item => item.item !== name.item));
                console.log(favList);
                setButtonC('#CFD8DC');
            }
        } else {
            Alert.alert("You need to sign in with your google account to add favorite food");
        }
    }

    /* ============================= Main Part ============================= */
    
    useEffect (() => {
        // Fetch the data from APIs and store it to state variables.
        getMenuData(0, setBreakfastJson); // Breakfast
        getMenuData(2, setLunchJson); // Lunch
        getMenuData(1, setBrunchJson); // Brunch
        getMenuData(3, setDinnerJson); // Dinner
    }, [today])
    
    // The array of all the data to diplay on the menu screen.
    // With this structure, the data can be selected by switch selectors through its indexes.
    var mealsList = [ processData(breakfastJson), processData(lunchJson),
                      processData(brunchJson), processData(dinnerJson) ];
    
    return (
      <SafeAreaView style={styles.container}>
            <SwitchSelector // Switch selector for meal hours
              options={hourOptions}
              initial={0}
              onPress={value => setHourChoice(Number(value))}
              backgroundColor={'#ffffff'}
              buttonColor={'#003660'}
              selectedColor={'#ffffff'}
              textColor={'#003660'}
            />
            <SwitchSelector // Switch selector for dining halls
              options={hallOptions}
              initial={0}
              onPress={value => setHallChoice(Number(value))}
              backgroundColor={'#ffffff'}
              buttonColor={'#febc11'}
              selectedColor={'#ffffff'}
              textColor={'#febc11'}
            />
            <SwitchSelector // Switch selector for food filters
              options={filterOptions}
              initial={0}
              onPress={value => setFilterChoice(Number(value))}
              backgroundColor={'#ffffff'}
              buttonColor={'#6d7d33'}
              selectedColor={'#ffffff'}
              textColor={'#6d7d33'}
            />
            <ScrollView>
            { // Check if the selected element of mealsList is NOT undefined.
                (mealsList!= undefined) && (mealsList[hourChoice] != undefined) &&
                (mealsList[hourChoice][hallChoice] != undefined) &&
                (mealsList[hourChoice][hallChoice][filterChoice] != undefined) ?
                // True: display the element of mealsList selected by switch selectors.
                <SectionList
                    keyExtractor={(item, index) => index.toString()}
                    sections={mealsList[hourChoice][hallChoice][filterChoice]}
                    renderSectionHeader={({section}) => (
                        <Text style={styles.sectionStyle}> {section.title} </Text>
                    )}
                    renderItem={({item}) => (
                        favList.some(fav => fav.item === {item}.item) ?
                        <Button color={buttonC} onPress={() => {HandleFavFood({item})}} title={item}></Button>
                        :
                        <Button color={buttonC} onPress={() => {HandleFavFood({item})}} title={item}></Button>
                    )
                }
                />
                : // False: display a loading message.
                <Text style={styles.textStyle}>Loading...</Text>
            }
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            </ScrollView>
      </SafeAreaView>
      );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    padding: 6,
    color: '#000000',
  },
  textStyle: {
      textAlign: 'center',
      fontSize: 16,
      color: '#000000',
  },
});

export default MenuScreen