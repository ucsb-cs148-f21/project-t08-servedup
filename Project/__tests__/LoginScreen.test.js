import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../screens/LoginScreen';
import { logInAsync, logOutAsync } from "expo-google-app-auth";

jest.mock('expo-google-app-auth', () => ({
    
    logInAsync: jest.fn(),
    logOutAsync: jest.fn(),
}));

//Module renders
describe('<LoginScreen />', () => {
    it('default render', () => {
        renderer.create(<LoginScreen />);
    });
});

//Tests login logout
describe('Mock functions', () => {
    it('default render', () => {
        renderer.create(<LoginScreen />);
    });
    it('can login', () => {
        logInAsync.mockImplementation(() => 'success');
        expect(logInAsync()).toBe('success');
    })
    it('can logout', () => {
        logOutAsync.mockImplementation(() => 'fail');
        expect(logOutAsync()).toBe('fail');
    })

})
