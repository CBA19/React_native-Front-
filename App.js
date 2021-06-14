import React, {Component} from 'react';
import {StyleSheet,Text,View} from "react-native";
import Container from './src/pages/AppNavigator';
import Navigator from './src/routes/Drawer';


export default class App extends Component<{}> {
  render() {
    return ( 
           <Navigator />  
           
    );
  }

 
  }