import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, SectionList } from 'react-native';

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
    /* Breakfast: 7:15am - 10:00am on Weekdays
       [0]: Carrillo - Breakfast, [1]: De La Guerra - Breakfast,
       [2]: Portola - Breakfast */
    /* Lunch: 11:00am - 3:00pm on Weekdays
       [0]: Carrillo - Lunch, [1]: De La Guerra - Lunch,
       [2]: Ortega - Lunch, [3]: Portola - Lunch */
    /* Dinner 1 : 5:00pm - 8:30pm on Weekdays
       [0]: Carrillo - Dinner, [1]: De La Guerra - Dinner,
       [2]: Ortega - Dinner, [3]: Portola - Dinner */
    /* Brunch: 10:00am - 2:00pm on Weekend
       [0]: Carrillo - Brunch, [1]: De La Guerra - Brunch,
       [2]: Portola - Brunch */
    /* Dinner 2: 5:00pm - 8:30pm
       [0]: Carrillo - Dinner, [1]: De La Guerra - Dinner,
       [2]: Portola - Dinner */
    const [ result, setResult ] = useState([]);

    // Variables to use for processing the data.
    var inputs = [];
    var pair = [];
    var names = [];
    var meal = [];
    var meals = [];
    
    // Fetch the data from APIs.
    if ((0 < currentDay) && (currentDay < 6)) { // Weekdays
      if (currentHour < 10) { // Breakfast: (display) 0:00am - 9:59am
          inputs = [
              // Carrillo - Breakfast
              fetch( baseUrl + today + '/' + hallCodes[0] + '/' + hourCodes[0],
                    { headers: { "ucsb-api-key": apiKey }}),
              // De La Guerra - Breakfast
              fetch( baseUrl + today + '/' + hallCodes[1] + '/' + hourCodes[0],
                    { headers: { "ucsb-api-key": apiKey }}),
              // Portola - Breakfast
              fetch( baseUrl + today + '/' + hallCodes[3] + '/' + hourCodes[0],
                    { headers: { "ucsb-api-key": apiKey }}),
          ];
      } else if ((10 <= currentHour) && (currentHour < 15)) { // Lunch: (display) 10:00am - 2:59pm
          inputs = [
              // Carrillo - Lunch
              fetch( baseUrl + today + '/' + hallCodes[0] + '/' + hourCodes[2],
                    { headers: { "ucsb-api-key": apiKey }}),
              // De La Guerra - Lunch
              fetch( baseUrl + today + '/' + hallCodes[1] + '/' + hourCodes[2],
                    { headers: { "ucsb-api-key": apiKey }}),
              // Ortega - Lunch
              fetch( baseUrl + today + '/' + hallCodes[2] + '/' + hourCodes[2],
                    { headers: { "ucsb-api-key": apiKey }}),
              // Portola - Lunch
              fetch( baseUrl + today + '/' + hallCodes[3] + '/' + hourCodes[2],
                    { headers: { "ucsb-api-key": apiKey }}),
          ];
      } else if (15 <= currentHour) { // Dinner1: (display) 3:00pm - 23:59pm
          inputs = [
              // Carrillo - Dinner
              fetch( baseUrl + today + '/' + hallCodes[3] + '/' + hourCodes[2],
                    { headers: { "ucsb-api-key": apiKey }}),
              // De La Guerra - Dinner
              fetch( baseUrl + today + '/' + hallCodes[0] + '/' + hourCodes[3],
                    { headers: { "ucsb-api-key": apiKey }}),
              // Ortega - Dinner
              fetch( baseUrl + today + '/' + hallCodes[2] + '/' + hourCodes[3],
                    { headers: { "ucsb-api-key": apiKey }}),
              // Portola - Dinner
              fetch( baseUrl + today + '/' + hallCodes[3] + '/' + hourCodes[3],
                    { headers: { "ucsb-api-key": apiKey }}),
          ];
      }
    } else { // Weekend
      if (currentHour < 14) { // Brunch: (display) 0:00am - 1:59pm
          inputs = [
              // Carrillo - Brunch
              fetch( baseUrl + today + '/' + hallCodes[0] + '/' + hourCodes[1],
                    { headers: { "ucsb-api-key": apiKey }}),
              // De La Guerra - Brunch
              fetch( baseUrl + today + '/' + hallCodes[1] + '/' + hourCodes[1],
                    { headers: { "ucsb-api-key": apiKey }}),
              // Portola - Brunch
              fetch( baseUrl + today + '/' + hallCodes[3] + '/' + hourCodes[1],
                    { headers: { "ucsb-api-key": apiKey }}),
          ];
      } else { // Dinner: (display) 2:00pm - 23:59pm
          inputs = [
              // Carrillo - Dinner
              fetch( baseUrl + today + '/' + hallCodes[0] + '/' + hourCodes[3],
                    { headers: { "ucsb-api-key": apiKey }}),
              // De La Guerra - Dinner
              fetch( baseUrl + today + '/' + hallCodes[1] + '/' + hourCodes[3],
                    { headers: { "ucsb-api-key": apiKey }}),
              // Portola - Dinner
              fetch( baseUrl + today + '/' + hallCodes[3] + '/' + hourCodes[3],
                    { headers: { "ucsb-api-key": apiKey }}),
          ];
      }
    }
                     
    Promise.all(inputs)
      .then(responses => { return Promise.all(responses.map(r => r.json())); })
      .then(jsons => { setResult(jsons); })
      .catch(error => { console.log(error); });
        
    // Process the date to make it usable in Section List.
    for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < result[i].length; j++) {
            pair = Object.values(result[i][j]);
            names.push(pair[0]);
        }
        meal.push(names);
        names = [];
    }

    if ((0 < currentDay) && (currentDay < 6)) { // Weekdays
        if (currentHour < 10) { // Breakfast: (display) 0:00am - 9:59am
            meals = [
                { title: `${hourNames[0]}: ${hallNames[0]}`, data: meal[0], },
                { title: `${hourNames[0]}: ${hallNames[1]}`, data: meal[1], },
                { title: `${hourNames[0]}: ${hallNames[3]}`, data: meal[2], },
            ];
        } else if ((10 <= currentHour) && (currentHour < 15)) { // Lunch: (display) 10:00am - 2:59pm
            meals = [
                { title: `${hourNames[2]}: ${hallNames[0]}`, data: meal[0], },
                { title: `${hourNames[2]}: ${hallNames[1]}`, data: meal[1], },
                { title: `${hourNames[2]}: ${hallNames[2]}`, data: meal[2], },
                { title: `${hourNames[2]}: ${hallNames[3]}`, data: meal[3], },
            ];
        } else if (15 <= currentHour) { // Dinner1: (display) 3:00pm - 23:59pm
            meals = [
                { title: `${hourNames[3]}: ${hallNames[0]}`, data: meal[0], },
                { title: `${hourNames[3]}: ${hallNames[1]}`, data: meal[1], },
                { title: `${hourNames[3]}: ${hallNames[2]}`, data: meal[2], },
                { title: `${hourNames[3]}: ${hallNames[3]}`, data: meal[3], },
            ];
        }
    } else { // Weekend
        if (currentHour < 14) { // Brunch: (display) 0:00am - 1:59pm
            meals = [
                { title: `${hourNames[1]}: ${hallNames[0]}`, data: meal[0], },
                { title: `${hourNames[1]}: ${hallNames[1]}`, data: meal[1], },
                { title: `${hourNames[1]}: ${hallNames[3]}`, data: meal[2], },
            ];
            
        } else { // Dinner: (display) 2:00pm - 23:59pm
            meals = [
                { title: `${hourNames[3]}: ${hallNames[0]}`, data: meal[0], },
                { title: `${hourNames[3]}: ${hallNames[1]}`, data: meal[1], },
                { title: `${hourNames[3]}: ${hallNames[3]}`, data: meal[2], },
            ];
        }
    }

    return (
      <SafeAreaView style={styles.container}>
            <View style={styles.container}>
            { meals[0].data != null ? // Check if the data is NOT undefined
                // True: display the SectionList
                <SectionList
                  refreshing={(meals.length >= 3)}
                  keyExtractor={(item, index) => index.toString()}
                  sections={meals}
                  renderSectionHeader={({section}) => (
                      <Text style={styles.sectionHeaderStyle}>
                          {section.title}
                      </Text>)}
                  renderItem={({item}) => (
                      <Text style={styles.sectionListItemStyle}>
                          {item}
                      </Text>)}
                />
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