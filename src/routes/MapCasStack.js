import { createStackNavigator } from 'react-navigation-stack';
import React, { Component } from 'react';
import MapCas from '../pages/MapCas';
import Header from '../Components/Header';
const screens = {
  MapCas: {
    screen: MapCas,
    navigationOptions: {
      headerShown:false,
    },
  },
}

const MapCasStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#455a64',
    headerStyle: { backgroundColor: '#455a64', height: 60 },
  }
});

export default MapCasStack;