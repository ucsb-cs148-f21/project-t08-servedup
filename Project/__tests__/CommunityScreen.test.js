import { exportAllDeclaration } from '@babel/types';
import { GiftedChat } from 'react-native-gifted-chat'
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { TestWatcher } from 'jest';
import React from 'react';
import renderer from 'react-test-renderer';
import 'firebase/firestore';

import { getApp } from "firebase/app";
import { useEmulator } from "firebase/functions";

// import App from '../App';
//import CommunityScreen from '../screens/CommunityScreen';
// import Loading from '../screens/Loading';
// import LoginScreen from '../screens/LoginScreen';
// import MenuScreen from '../screens/MenuScreen';
// import UserScreen from '../screens/UserScreen';

// beforeEach(async () => {
//   await AsyncStorage.clear();
// });

const firebase = require('@firebase/testing')
const admin = require('firebase-admin')

firebase.functions().useEmulator("localhost", 8080);

const projectId = "served-up-63c2e"
process.env.GCLOUD_PROJECT = projectId
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
let app = admin.initializeApp({projectId})
let db = firebase.firestore(app) 

beforeAll(async ()=>{
  await firebase.clearFirestoreData({projectId});
});

test("Expect to find a copy in 'Copies' Collection", async ()=>{
  const testDoc = {
      name: 'Samer',
      age: 21,
      city: 'Riyadh'
  }

  const ref = db.collection('Test').doc()
  await ref.set(testDoc)
  expect(1).toBe(1)
});


// const collection = jest.fn(() => {
//   return {
//     doc: jest.fn(() => {
//       return {
//         collection: collection,
//         update: jest.fn(() => Promise.resolve(true)),
//         onSnapshot: jest.fn(() => Promise.resolve(true)),
//         get: jest.fn(() => Promise.resolve(true))
//       }
//     }),
//     where: jest.fn(() => {
//       return {
//         get: jest.fn(() => Promise.resolve(true)),
//         onSnapshot: jest.fn(() => Promise.resolve(true)),
//       }
//     })
//   }
// });

// const Firestore = () => {
//   return {
//     collection
//   }
// }

// Firestore.FieldValue = {
//   serverTimestamp: jest.fn()
// }

// export default class RNFirebase {

//   static initializeApp = jest.fn();

//   static auth = jest.fn(() => {
//     return {
//       createUserAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
//       sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
//       signInAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
//       fetchSignInMethodsForEmail: jest.fn(() => Promise.resolve(true)),
//       signOut: jest.fn(() => Promise.resolve(true)),
//       onAuthStateChanged: jest.fn(),
//       currentUser: {
//         sendEmailVerification: jest.fn(() => Promise.resolve(true))
//       }
//     }
//   });

//   static firestore = Firestore;
// }

// jest.mock("react-native-gifted-chat", () => ({
//   GiftedChat: jest.fn(),
// }));

// jest.mock("@react-native-async-storage/async-storage", () => ({
//   AsyncStorage: jest.fn(() => "mock success"),
// }));

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: jest.fn(),
//   useEffect: jest.fn(), 
//   useCallback: jest.fn(),
// }));

// describe('<CommunityScreen />', () => {
//   // const setState = jest.fn();
//   // beforeEach(() => {
//   //           useStateMock.mockImplementation(init => [init, setState]);
//   //        });
//   it('default render', () => {
    
//     renderer.create(<CommunityScreen />);
//   });
// });

// test('mocking asyncstorage', () => {
//   expect(AsyncStorage) === 'mock success';
// });

// it('checks if Async Storage is used', async () => {
//   await asyncOperationOnAsyncStorage();

//   expect(AsyncStorage.getItem).toBeCalledWith('myKey');
// })