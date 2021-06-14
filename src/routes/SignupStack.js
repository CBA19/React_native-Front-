import { createStackNavigator } from 'react-navigation-stack';
import React, { Component } from 'react';
import Signup from '../pages/Signup';
import Header from '../Components/Header';
const screens = {
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerShown:false,
    },
  },
}

const SignupStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#455a64',
    headerStyle: { backgroundColor: '#455a64', height: 60 },
  }
});

export default SignupStack;