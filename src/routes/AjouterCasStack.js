import { createStackNavigator } from 'react-navigation-stack';
import AjouterCas from '../pages/AjouterCas';
import React, { Component } from 'react';
import Header from '../Components/Header';

const screens = {
  AjouterCas: {
    screen: AjouterCas,
    navigationOptions:({ navigation }) => {
      return {
        headerTitle: () => <Header title='Ajouter cas ' navigation={navigation} />
      }
  },
},
};

const AjouterCasStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#455a64',
    headerStyle: { backgroundColor: '#455a64', height: 60 },
  }
});

export default AjouterCasStack;