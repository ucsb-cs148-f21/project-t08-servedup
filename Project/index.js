import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import { Provider } from 'react-redux';

import configureStore from '/src/store';

const store = configureStore();

const ReduxWrap = () =>
    <Provider store={store} >
        <App />
    </ Provider >


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

AppRegistry.registerComponent(appName, () => ReduxWrap);
// commented out registerRootComponent(App);
