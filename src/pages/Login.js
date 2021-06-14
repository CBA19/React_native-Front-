import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  Navigator
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
   inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
    logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'rgba(255, 255, 255, 0.7)'
  }
});


export default class Login extends Component<{}> {


	render() {
    
    
		return(
			<View style={styles.container}>
      <Image  style={{width:40, height: 70,}}
          			source={require('../images/logo.png')}/>
          		<Text style={styles.logoText}>Welcome to GiveBit</Text>	
        <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
            name="email"
            placeholder="Email"
            onChangeText={(email)=> this.setState({email})}
            value={this.state.email}
          />
        <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
            name="password"
            placeholder="Password"
            secureTextEntry={true}
             onChangeText={(password)=> this.setState({password})}
            value={this.state.password}
             />
        <TouchableOpacity style={styles.button} onPress={this.login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Do not have an account yet?</Text>
					<TouchableOpacity
           onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
				</View>
			</View>
			)
	}

  constructor(props){
    super(props);
    this.state ={email: '', password:''};
  }

  login= () => {

    fetch('http://192.168.13.1:3000/api/user/login', {

      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        Email:this.state.email,
        Password:this.state.password,
      })
    })
    .then((response) => response.json())
    .then((res) => {

        if(res.success === true)
        {
          var id=res.message;
          var token=res.token;
           this.props.navigation.push('Memberarea', {
             id: id ,
             token:token,
             
             });
          
        }
        else {
          alert(res.message);
        }

    })
    .done();
  }


}


  
