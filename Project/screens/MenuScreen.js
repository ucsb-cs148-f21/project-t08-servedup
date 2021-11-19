import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, SectionList } from 'react-native';
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

    if ((0 < currentDay) && (currentDay < 6)) { // Weekdays
        var options = [
            { label: hourNames[0], value: "0" },
            { label: hourNames[2], value: "1" },
            { label: hourNames[3], value: "2" }
          ];
        var meals1 = [
            { title: hallNames[0], data: meal1[0], },
            { title: hallNames[1], data: meal1[1], },
            { title: hallNames[3], data: meal1[2], },
        ];
        var  meals2 = [
            { title: hallNames[0], data: meal2[0], },
            { title: hallNames[1], data: meal2[1], },
            { title: hallNames[2], data: meal2[2], },
            { title: hallNames[3], data: meal2[3], },
        ];
        var meals3 = [
            { title: hallNames[0], data: meal3[0], },
            { title: hallNames[1], data: meal3[1], },
            { title: hallNames[2], data: meal3[2], },
            { title: hallNames[3], data: meal3[3], },
        ];
        var mealsList = [meals1, meals2, meals3];
        
    } else { // Weekend
        options = [
            { label: hourNames[1], value: "0" },
            { label: hourNames[2], value: "1" }
          ];
        var meals1 = [
                { title: hallNames[0], data: meal1[0], },
                { title: hallNames[1], data: meal1[1], },
                { title: hallNames[3], data: meal1[2], },
            ];
            
        var meals2 = [
                { title: hallNames[0], data: meal2[0], },
                { title: hallNames[1], data: meal2[1], },
                { title: hallNames[3], data: meal2[2], },
            ];
        var mealsList = [meals1, meals2];
    }
    
    const createSectionList = (meals) => {
        return <SectionList
                keyExtractor={(item, index) => index.toString()}
                sections={meals}
                renderSectionHeader={({section}) => (
                    <Text style={styles.sectionHeaderStyle}>{section.title}</Text>)}
                renderItem={({item}) => (
                    <Text style={styles.sectionListItemStyle}>{item}</Text>)}
                />
    }
    
    return (
      <SafeAreaView style={styles.container}>
            <Text style={styles.loadingTextStyle}></Text>
            <Text style={styles.loadingTextStyle}></Text>
            <Text style={styles.loadingTextStyle}></Text>
            <SwitchSelector
              options={options}
              initial={0}
              onPress={value => setHourChoice(Number(value))}
              textColor={'#febc11'}
              selectedColor={'#ffffff'}
              buttonColor={'#febc11'}
              borderColor={'#febc11'}
            />
            <View style={styles.container}>
            { meals1[0].data != null ? // Check if the data is NOT undefined
                // True: display the SectionList
                createSectionList(mealsList[hourChoice])
                : // False: display a loading screen
                <Text style={styles.loadingTextStyle}>Loading...</Text>
            }
            </View>
      </SafeAreaView>
      );
  }

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  loadingTextStyle: {
    textAlign: 'center',
    color: '#000000',
  },
  sectionHeaderStyle: {
      textAlign: 'center',
      backgroundColor: '#003660',
      fontSize: 19,
      padding: 6,
      color: '#ffffff',
  },
  sectionListItemStyle: {
      textAlign: 'center',
      fontSize: 16,
      color: '#000000',
  },
});

export default MenuScreen