import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';
// import CommunityScreen from '../screens/CommunityScreen';
// import Loading from '../screens/Loading';
// import LoginScreen from '../screens/LoginScreen';
// import MenuScreen from '../screens/MenuScreen';
// import UserScreen from '../screens/UserScreen';

describe('<App />', () => {
  it('default render', () => {
    renderer.create(<App />);
  });
});