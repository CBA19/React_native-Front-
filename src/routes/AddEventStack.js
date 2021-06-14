import { createStackNavigator } from 'react-navigation-stack';
import AddEvent from '../pages/AddEvent';
import React, { Component } from 'react';
import Header from '../Components/Header';

const screens = {
  AddEvent: {
    screen: AddEvent,
    navigationOptions:({ navigation }) => {
      return {
        headerTitle: () => <Header title='Add Event ' navigation={navigation} />
      }
  },
},
};

const AddEventStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#455a64',
    headerStyle: { backgroundColor: '#455a64', height: 60 },
  }
});

export default AddEventStack;