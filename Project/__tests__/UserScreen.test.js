import React from 'react';
import renderer from 'react-test-renderer';
import {useState as useStateMock, useEffect} from 'react';
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn()
}));
import {MediaTypeOptions, requestMediaLibraryPermissionsAsync, launchImageLibraryAsync, launchCameraAsync} from 'expo-image-picker';
jest.mock("expo-image-picker", () => ({
  MediaTypeOptions: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
}));
import UserScreen from '../screens/UserScreen';
import userEvent from '@testing-library/user-event'

describe('<UserScreen />', () => {
  const setState = jest.fn();
  beforeEach(() => {
            useStateMock.mockImplementation(init => [init, setState]);
         });
  it('default render', () => {
    renderer.create(<UserScreen />);
  });
  it('user click', () => {
    const {screen} = renderer.create(<UserScreen />);
  });
});
