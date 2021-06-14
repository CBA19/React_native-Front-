import { createStackNavigator } from 'react-navigation-stack';
import ListeEvents from '../pages/ListeEvents';
import React, { Component } from 'react';
import Header from '../Components/Header';

const screens = {
  ListeEvents: {
    screen: ListeEvents,
    navigationOptions:({ navigation }) => {
      return {
        headerTitle: () => <Header title='Liste des events ' navigation={navigation} />
      }
  },
},
};

const ListeEventsStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#455a64',
    headerStyle: { backgroundColor: '#455a64', height: 60 },
  }
});

export default ListeEventsStack;