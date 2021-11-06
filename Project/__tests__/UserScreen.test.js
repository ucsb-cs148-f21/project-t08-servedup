import React from 'react';
import renderer from 'react-test-renderer';
import {useState as useStateMock} from 'react';
import {MediaTypeOptions, requestMediaLibraryPermissionsAsync, launchImageLibraryAsync, launchCameraAsync} from 'expo-image-picker';
import UserScreen from '../screens/UserScreen';

jest.mock("expo-image-picker", () => ({
  MediaTypeOptions: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('<UserScreen />', () => {
  const setState = jest.fn();
  beforeEach(() => {
            useStateMock.mockImplementation(init => [init, setState]);
         });
  it('default render', () => {
    
    renderer.create(<UserScreen />);
  });
});