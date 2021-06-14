import { createStackNavigator } from 'react-navigation-stack';
import React, { Component } from 'react';
import Memberarea from '../pages/Memberarea';
import Header from '../Components/Header';
const screens = {
  Memberarea: {
    screen: Memberarea,
    navigationOptions:({ navigation }) => {
      return {
        headerTitle: () => <Header  navigation={navigation} />
      }
  },
},
};
const MemberareaStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#455a64',
    headerStyle: { backgroundColor: '#455a64', height: 60 },
  }
});

export default MemberareaStack;