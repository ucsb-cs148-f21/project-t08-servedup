import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import SwitchSelector from "react-native-switch-selector";

const MenuScreen = ({ navigation }) => {
    
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
    
    // Fetch the menu data for a specified hour and store to a specified state variable.
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
    
    // Process the data to make it usable for the display.
        // state: the state variable which contains the menu data
    const processData = (state) => {
        var result = [];
        for (var i = 0; i < state.length; i++) {
            // state[i] contains menu data if it is an array (of objects).
            if ( Array.isArray(state[i]) ) {
                // Create the array of arrays of food name strings from the menu data.
                // names[0]: all names, names[1]: names with (v),
                // names[2]: names with (vgn), names[3]: names with (w/nuts)
                var names = [[], [], [], []];
                // Flag to see if the menu contains any vegetarian, vegan, or nuts item.
                var hasVegetarian = false;
                var hasVegan = false;
                var hasNuts = false;
                for (var j = 0; j < state[i].length; j++) {
                    var pair = Object.values(state[i][j]);
                    names[0].push(pair[0]);
                    if (pair[0].includes('(v)')) {
                        names[1].push(pair[0]);
                        hasVegetarian = true;
                    }
                    if (pair[0].includes('(vgn)')) {
                        names[2].push(pair[0]);
                        hasVegan = true;
                    }
                    if (pair[0].includes('(w/nuts)')) {
                        names[3].push(pair[0]);
                        hasNuts = true;
                    }
                }
                // If the menu contains no vegetarian, vegan, or nuts item,
                // store the message string that tells no result to display.
                if (!hasVegetarian) {
                    names[1].push("No Item");
                }
                if (!hasVegan) {
                    names[2].push("No Item");
                }
                if (!hasNuts) {
                    names[3].push("No Item");
                }
                result.push(names);
            } else {
                // state[i] contains an object to represent the meal is not served.
                if (state[i].status == 404 ) {
                    result.push([["Closed"], ["Closed"], ["Closed"], ["Closed"]]);
                } else { // state[i] contains an object to represent some error.
                    result.push([["Error"], ["Error"], ["Error"], ["Error"]]);
                }
            }
        }
        return result;
    }
    
    /* ============================= Main Part ============================= */
    
    useEffect (() => {
        // Fetch the data from APIs and store it to state variables.
        getMenuData(0, setBreakfastJson); // Breakfast
        getMenuData(2, setLunchJson); // Lunch
        getMenuData(1, setBrunchJson); // Brunch
        getMenuData(3, setDinnerJson); // Dinner
    }, [])
    
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
                mealsList[hourChoice][hallChoice][filterChoice].map((item, key)=>(
                    <Text key={key} style={styles.textStyle}>{ item }</Text>))
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
    justifyContent: 'center',
  },
  textStyle: {
      textAlign: 'center',
      fontSize: 16,
      color: '#000000',
  },
});

export default MenuScreen
