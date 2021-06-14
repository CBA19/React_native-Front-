import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer  } from "react-navigation";
import LoginScreen from './Login';
import MemberareaScreen from './Memberarea';
import DetailsCasScreen from './DetailsCas';
import SignupScreen from './Signup';
import AjouterCasScreen from "./AjouterCas";
import DrawerScreen from '../routes/Drawer';
import MapCasScreen from './MapCas';
import AddEventScreen from './AddEvent';
import ListeEventsScreen from './ListeEvents';
import DetailsEventScreen from './DetailsEvent';

const NavigationStack = createStackNavigator({
    Login: { 
        screen: LoginScreen,
         navigationOptions:{
             headerShown:false,
         },
    },
    Memberarea: { 
        screen: MemberareaScreen,
         navigationOptions:{
             headerShown:true,
         },
        },

    DetailsCas: { 
        screen: DetailsCasScreen,
         navigationOptions:{
             headerShown:true,
         },
        },
     Signup: { 
        screen: SignupScreen,
         navigationOptions:{
             headerShown:false,
         },
        },
      Drawer: { 
        screen: DrawerScreen,
         navigationOptions:{
             headerShown:false,
         },
        },
      AjouterCas: { 
        screen: AjouterCasScreen,
         navigationOptions:{
             headerShown:true,
         },
        },
       MapCas: { 
        screen: MapCasScreen,
         navigationOptions:{
             headerShown:false,
         },
       },

        AddEvent: { 
        screen: AddEventScreen,
         navigationOptions:{
             headerShown:false,
         },
        },
        ListeEvents: { 
        screen: ListeEventsScreen,
         navigationOptions:{
             headerShown:false,
         },
        },
        DetailsEvent: { 
        screen: DetailsEventScreen,
         navigationOptions:{
             headerShown:false,
         },
        },

    

  
},
     {
    initialRouteName: 'Login'
     }
);

const Container = createAppContainer(NavigationStack);

export default Container; 