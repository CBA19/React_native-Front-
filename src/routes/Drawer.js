import { createDrawerNavigator ,DrawerItems} from 'react-navigation-drawer';
import { createAppContainer  } from 'react-navigation';
import { StyleSheet, Text, View , ScrollView, Image} from 'react-native';
// stacks
import MemberareaStack from './MemberareaStack';
import LoginStack from './LoginStack';
import ListeCasStack from './ListeCasStack';
import DetailsCasStack from './DetailsCasStack';
import SignupStack  from "./SignupStack";
import AjouterCasStack from "./AjouterCasStack";
import MapCasStack from "./MapCasStack";
import AddEventStack  from './AddEventStack';
import React, { Component } from 'react';
import { Container, Content, Icon, Header, Body } from 'native-base';
import ListeEventsStack from './ListeEventsStack';
import DetailsEventStack from "./DetailsEventStack";

//import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'


 class Drawer extends Component<{}> {

	render() {
     
		return(
      <RootDrawerNavigator />
    )
	}



}
  

 const CustomDrawerContentComponent = (props) => (
  <Container>

    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>
 
			);

    // drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
 Login: {
    screen: LoginStack,
     navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => null,
            }
        }
  },
   Signup: {
    screen: SignupStack,
     navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => null,
            }
        }
  },
  Memberarea: {
    screen: MemberareaStack,
  },

  ListeCas: {
    screen: ListeCasStack,
  },
  DetailsCas: {
    screen: DetailsCasStack,
         navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => null,
            }
        }
  },
  AjouterCas: {
    screen:AjouterCasStack,
         navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => null,
            }
        }
  },
  MapCas: {
    screen:MapCasStack,
         navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => null,
            }
        },      
  },

  ListeEvents: {
    screen:ListeEventsStack,  
  },
   AddEvent: {
    screen:AddEventStack,  
      navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => null,
            }
        }, 
  },

   DetailsEvent: {
    screen:DetailsEventStack,  
      navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => null,
            }
        }, 
  },

},

{
initialRouteName: 'Login',
drawerPosition: 'left',
contentComponent : CustomDrawerContentComponent,
drawerOpenRoute: 'DrawerOpen',
drawerCloseRoute: 'DrawerClose',
drawerToggleRoute: 'DrawerToggle'
});

export default createAppContainer(RootDrawerNavigator);