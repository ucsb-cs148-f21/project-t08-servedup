import React from 'react';
import renderer from 'react-test-renderer';
import {
    render
} from '@testing-library/react';
// import App from '../App';
// import CommunityScreen from '../screens/CommunityScreen';
// import Loading from '../screens/Loading';
import LoginScreen from '../screens/LoginScreen';

//import fetchMock from 'fetch-mock';
import * as Google from "expo-google-app-auth";

jest.mock('expo-google-app-auth', () => ({
    logInAsync: jest.fn(() => 'mock success'),
    logOutAsync: jest.fn(() => 'mock success'),
}));

//Module renders
describe('<LoginScreen />', () => {
    it('default render', () => {
        renderer.create(<LoginScreen />);
        
    });
});
test('mocking login async', () => {
    expect(Google.logInAsync) === 'mock success';
});
test('mocking logout async', () => {
    expect(Google.logOutAsync) === 'mock success';
});




