import { createStackNavigator } from 'react-navigation-stack';
import DetailsEvent from '../pages/DetailsEvent';
import React, { Component } from 'react';
import Header from '../Components/Header';

const screens = {
  DetailsEvent: {
    screen: DetailsEvent,
    navigationOptions:({ navigation }) => {
      return {
        headerTitle: () => <Header  navigation={navigation} />
      }
  },
},
};

const DetailsEventStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#455a64',
    headerStyle: { backgroundColor: '#455a64', height: 60 },
  }
});

export default DetailsEventStack;