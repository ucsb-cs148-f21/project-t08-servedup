import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './src/store.js';



/*const store = configureStore();

const ReduxTutorial = () =>
    <Provider store={store}>
        <App />
    </Provider>*/

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

//AppRegistry.registerComponent(appName, () => ReduxTutorial);

//AppRegistry.registerComponent('main', () => App);

// commented out 
registerRootComponent(App);


/*const ReduxWrap = () =>
    <Provider store={store} >
        <App />
    </ Provider >*/
