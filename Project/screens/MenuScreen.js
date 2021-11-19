import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import SwitchSelector from "react-native-switch-selector";

const MenuScreen = ({ navigation}) => {
    // Current date
    const date = new Date();
    const today = `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()}`;
    const currentDay = date.getDay(); // 0: Sn, 1: M, 2: T, 3: W, 4: R, 5: F, 6: St
    const currentHour = date.getHours(); // 0 - 23
    // Codes of dining halls and meal hours: for API calls
    const hallCodes = ["carrillo", "de-la-guerra", "ortega", "portola"];
    const hourCodes = ["breakfast", "brunch", "lunch", "dinner", "late-night"];
    // Names of dining halls and meal hours: for display
    const hallNames = ["Carrillo", "De La Guerra", "Ortega", "Portola"];
    const hourNames = ["Breakfast", "Brunch", "Lunch", "Dinner", "Late Night"];
    // Base URL and API key
    const baseUrl = "https://api.ucsb.edu/dining/menu/v1/";
    const apiKey = "S7Onov28BCmMrMbIWfh4rGRvg2Uc3F6I";
    
    // State variables to store data fetched from API.
    // Each element is a JSON object with keys 'name' and 'station.'
    /* Breakfast
       [0]: Carrillo - Breakfast, [1]: De La Guerra - Breakfast,
       [2]: Portola - Breakfast */
    /* Lunch
       [0]: Carrillo - Lunch, [1]: De La Guerra - Lunch,
       [2]: Ortega - Lunch, [3]: Portola - Lunch */
    /* Dinner1 on Weekdays
       [0]: Carrillo - Dinner, [1]: De La Guerra - Dinner,
       [2]: Ortega - Dinner, [3]: Portola - Dinner */
    /* Brunch
       [0]: Carrillo - Brunch, [1]: De La Guerra - Brunch,
       [2]: Portola - Brunch */
    /* Dinner2 on Weekend
       [0]: Carrillo - Dinner, [1]: De La Guerra - Dinner,
       [2]: Portola - Dinner */
    const [ result1, setResult1 ] = useState([]);
    const [ result2, setResult2 ] = useState([]);
    const [ result3, setResult3 ] = useState([]);
    const [ hourChoice, setHourChoice ] = useState(0);
    const [ hallChoice, setHallChoice ] = useState(0);
    
    // Craete and return the fetch with specified hall and hour.
    const fetchSelected = (hallIndex, hourIndex) => {
        return fetch( baseUrl + today + '/' + hallCodes[hallIndex] + '/' + hourCodes[hourIndex],
                     { headers: { "ucsb-api-key": apiKey }})
    }
    // Store the response from fetch in the specified state variable.
    const storeData = (inputs, setState) => {
        Promise.all(inputs)
            .then(responses => { return Promise.all(responses.map(r => r.json())); })
            .then(jsons => { setState(jsons); })
            .catch(error => { console.log(error); })
    }
    // Process the data to make it usable in Section List.
    const processData = (state) => {
        var pair = [];
        var names = [];
        var result = [];
        for (var i = 0; i < state.length; i++) {
            for (var j = 0; j < state[i].length; j++) {
                pair = Object.values(state[i][j]);
                names.push(pair[0]);
            }
            result.push(names);
            names = [];
        }
        return result;
    }
    
    useEffect (() => {
        // Fetch the data from APIs.
        if ((0 < currentDay) && (currentDay < 6)) { // Weekdays
            // Breakfast: Carrillo, De La Guerra, Portola
            var inputs1 = [ fetchSelected(0,0), fetchSelected(1,0), fetchSelected(3,0) ];
            storeData(inputs1, setResult1);
            
            // Lunch: Carrillo, De La Guerra, Ortega, Portola
            var inputs2 = [ fetchSelected(0,2), fetchSelected(1,2), fetchSelected(2,2), fetchSelected(3,2) ];
            storeData(inputs2, setResult2);
            
            // Dinner1: Carrillo, De La Guerra, Ortega, Portola
            var inputs3 = [ fetchSelected(0,3), fetchSelected(1,3), fetchSelected(2,3), fetchSelected(3,3) ];
            storeData(inputs3, setResult3);
            
        } else { // Weekend
            // Brunch: Carrillo, De La Guerra, Portola
            var inputs1 = [ fetchSelected(0,1), fetchSelected(1,1), fetchSelected(3,1) ];
            storeData(inputs1, setResult1);
            
            // Dinner2: Carrillo, De La Guerra, Portola
            var inputs2 = [ fetchSelected(0,3), fetchSelected(1,3), fetchSelected(3,3) ];
            storeData(inputs2, setResult2);
        }
    }, [])
    
    var meal1 = processData(result1);
    var meal2 = processData(result2);
    var meal3 = processData(result3);
    
    var hallOptions = [
        { label: hallNames[0], value: "0" },
        { label: hallNames[1], value: "1" },
        { label: hallNames[2], value: "2" },
        { label: hallNames[3], value: "3" },
    ];

    if ((0 < currentDay) && (currentDay < 6)) { // Weekdays
        var hourOptions = [
            { label: hourNames[0], value: "0" },
            { label: hourNames[2], value: "1" },
            { label: hourNames[3], value: "2" }
        ];
        var meals1 = [ meal1[0], meal1[1], ["Closed"], meal1[2] ];
        var meals2 = [ meal2[0], meal2[1], meal2[2], meal2[3] ];
        var meals3 = [ meal3[0], meal3[1], meal3[2], meal3[3] ];
        var mealsList = [meals1, meals2, meals3];
        
    } else { // Weekend
        var hourOptions = [
            { label: hourNames[1], value: "0" },
            { label: hourNames[2], value: "1" }
          ];
        var meals1 = [ meal1[0], meal1[1], ["Closed"], meal1[2] ];
        var meals2 = [ meal2[0], meal2[1], ["Closed"], meal2[2] ];
        var mealsList = [meals1, meals2];
    }
    
    return (
      <SafeAreaView style={styles.container}>
            <SwitchSelector
              options={hourOptions}
              initial={0}
              onPress={value => setHourChoice(Number(value))}
              backgroundColor={'#ffffff'}
              buttonColor={'#003660'}
              selectedColor={'#ffffff'}
              textColor={'#003660'}
            />
            <SwitchSelector
              options={hallOptions}
              initial={0}
              onPress={value => setHallChoice(Number(value))}
              backgroundColor={'#ffffff'}
              buttonColor={'#febc11'}
              selectedColor={'#ffffff'}
              textColor={'#febc11'}
            />
            <ScrollView>
            { mealsList[0][0] != null  ? // Check if the data is NOT undefined
                // True: display the mealsList
                mealsList[hourChoice][hallChoice].map((item, key)=>(
                    <Text key={key} style={styles.textStyle}>{ item }</Text>))
                : // False: display a loading screen
                <Text style={styles.textStyle}>Loading...</Text>
            }
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