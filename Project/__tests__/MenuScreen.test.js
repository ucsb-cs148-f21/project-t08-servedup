import renderer from 'react-test-renderer';
import * as React from 'react';
import { useState } from 'react';
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}));
import { StyleSheet, View, Text, SafeAreaView, SectionList } from 'react-native';
import SwitchSelector from "react-native-switch-selector";
jest.mock("react-native-switch-selector", () => ({
  SwitchSelector: jest.fn()
}));
import MenuScreen from '../screens/MenuScreen';

describe('<App />', () => {
 const menuSpy = [
  {
    "name": "Tofu Banh Mi Sandwich (v)",
    "station": "Entree Specials",
  },
  {
    "name": "Pineapple Fried Rice (w/nuts) (vgn)",
    "station": "Entree Specials",
  }
 ];
 const fetchSpy = [
    {
      "_U": 0,
      "_V": 0,
      "_W": null,
      "_X": null,
    },
    {
      "_U": 0,
      "_V": 0,
      "_W": null,
      "_X": null,
    }
 ];
  // beforeEach(() => {
  //   globalThis.fetch = jest.fn(() => Promise.resolve({
  //     json: () => Promise.resolve(fetchSpy)
  //   }));
  // });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('default render', () => {
    globalThis.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(menuSpy)
    }));
    const setResult = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(results => [results=menuSpy, setResult]);
    renderer.create(<MenuScreen />);
  });
});