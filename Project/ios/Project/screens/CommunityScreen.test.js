// const { tsExternalModuleReference } = require('@babel/types')
// const CommunityScreen = require('./CommunityScreen')
import React from 'react';
import { render } from "@testing-library/react-native";

import CommunityScreen from './CommunityScreen';

it("renders", () => {
    const { getAllByText } = render(<CommunityScreen />);

    expect(getAllByText('user').length.toBe(2));
});