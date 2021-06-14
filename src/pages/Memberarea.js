import React, {Component} from 'react';
import {
StyleSheet,
Text,
View,
Image,
Navigator,
TouchableOpacity,
AppRegistry,
Button,
FlatList
 } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {decode as atob, encode as btoa} from 'base-64';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class Memberarea extends Component<{}> {

	state={
   data:null,
   };

 

    fetchData=async() =>{
       const { params } = this.props.navigation.state;
      const response =  await  fetch('http://192.168.13.1:3000/api/user/getUser/'+params.id);
         
		const user = await response.json(); // products have array data
		this.setState({data: user}); // filled data with dynamic array
    };
	componentDidMount(){
		this.fetchData();
	}
  render() {
     const { params } = this.props.navigation.state;
		 const {navigate} = this.props.navigation;
     
    return (     
 <View style={styles.container}>
           
    <Icon name='event' size={28}  onPress={() => this.props.navigation.push("AddEvent", {token:params.token})}
     style={styles.icon}  style={{color:'#333'}} />

		  <FlatList
		  data={this.state.data}
		  keyExtractor={(item,index) => index.toString()}
		  renderItem={({item})=>
          
		  <View style={styles.productBox}>
       <Image
              source={{uri:item.image}}
              style={styles.drawerImage}
            />
	        <Text style={{color:'#fff', fontWeight:'bold'}}>Login: {item.login}</Text>
          <Text style={{color:'#fff', fontWeight:'bold'}}>E-mail: {item.email}</Text>          
          <Text style={{color:'#fff', fontWeight:'bold'}}>Adresse: {item.addresse}</Text>
          <Text style={{color:'#fff', fontWeight:'bold'}}>Role: {item.role}</Text>
		  </View>
          
          
    
  }
          />
            <TouchableOpacity style={styles.button} onPress={this.logout}>
             <Text style={styles.buttonText}>Logout</Text>
           </TouchableOpacity>
		</View>
    );
  }

   logout= () => {

    fetch('http://192.168.13.1:3000/api/user/lougoutUser')
    .then((response) => response.json())
    .then((res) => {

        if(res.success === true)
        {
          
           
           this.props.navigation.navigate('Login');
           //alert(id);
        }
        else {
          alert(res.message);
        }

    })
    .done();
  }

}

const styles = StyleSheet.create({
    header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  	productBox:{
		padding:5,margin:10,borderColor:'orange',borderBottomWidth:1
	},
    button: {
    width:300,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
    icon: {
    position: 'absolute',
    right: 6,
    color: '#333',
    width: '100%',
    height: '100%',
    flexDirection: 'row'
  }
  });

 AppRegistry.registerComponent('Memberarea', () => Memberarea);
