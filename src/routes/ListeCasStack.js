import { createStackNavigator } from 'react-navigation-stack';
import ListeCas from '../pages/ListeCas';
import React, { Component } from 'react';
import Header from '../Components/Header';

const screens = {
  ListeCas: {
    screen: ListeCas,
    navigationOptions:({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />
      }
  },
},
};

const ListeCasStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#455a64',
    headerStyle: { backgroundColor: '#455a64', height: 60 },
  }
});

export default ListeCasStack;