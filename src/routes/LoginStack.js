import { createStackNavigator } from 'react-navigation-stack';
import React, { Component } from 'react';
import Login from '../pages/Login';
import Header from '../Components/Header';
const screens = {
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown:false,
    },
  },
}

const LoginStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#455a64',
    headerStyle: { backgroundColor: '#455a64', height: 60 },
  }
});

export default LoginStack;