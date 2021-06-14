import { createStackNavigator } from 'react-navigation-stack';
import DetailsCas from '../pages/DetailsCas';
import React, { Component } from 'react';
import Header from '../Components/Header';

const screens = {
  DetailsCas: {
    screen: DetailsCas,
    navigationOptions:({ navigation }) => {
      return {
        headerTitle: () => <Header  navigation={navigation} />
      }
  },
},
};

const DetailsCasStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#455a64',
    headerStyle: { backgroundColor: '#455a64', height: 60 },
  }
});

export default DetailsCasStack;