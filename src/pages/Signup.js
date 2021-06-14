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
  Navigator,
  Picker,
  Button,
  SafeAreaView, 
  ScrollView
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const options={
  takePhotoButtonTitle: '',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
}
 const createFormData = (image, body) => {
  const data = new FormData();

  data.append("image", {
  type: 'image/jpeg',
  name: 'image.jpg',
  uri:
      Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")

  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
}

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
  },
  Label:{
      color:"#9F9696"
  }
});


export default class Signup extends Component<{}> {


	render() {
    const { image } = this.state
    
		return(
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
			<View style={styles.container}>
 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 50, height: 50 }}
            />
        )}
        <Button title="Choose Photo" onPress={this.myfun} />
      </View>
        <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
            name="login"
            placeholder="Login"
            onChangeText={(login)=> this.setState({login})}
            value={this.state.login}
          />
        <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
            name="email"
            textContentType="emailAddress"
            placeholder="Email"
            onChangeText={(email)=> this.setState({email})
            }
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
                     <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
            name="addresse"
            placeholder="Address"
             onChangeText={(addresse)=> this.setState({addresse})}
            value={this.state.addresse}
             />
           
             <Picker style={styles.inputBox}
		style={{width:'50%'}}
		selectedValue={this.state.role}
		onValueChange={(itemValue,itemIndex) => this.setState({role:itemValue})}
		>
		<Picker.Item label="Select a role :" value="" />
		<Picker.Item label="Simple user" value="simple" />
		<Picker.Item label="Entreprise" value="entreprise"/>
		</Picker>
        
        <TouchableOpacity style={styles.button} onPress={this.signup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
				
                <View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Do you already have an account?</Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}><Text style={styles.signupButton} > Sign in</Text></TouchableOpacity>
				</View>
			</View>
        </ScrollView>
    </SafeAreaView>
			)
	}

  constructor(props){
    super(props);
    this.state ={login:'',email: '', password:'',role:'',addresse:'',image: null};
  }
validateEmail = email => {
var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(email);
};
signup = () => {
  fetch("http://192.168.13.1:3000/api/user/Signup", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'multipart/form-data',
    },
    body: createFormData(this.state.image, 
    { Login: this.state.login,
    Email:this.state.email,
    Password:this.state.password,
    Role:this.state.role,
    Addresse:this.state.addresse }),
  })
    .then(response => response.json())
    .then(response => {
      //Handler for the Submit onPress
    if (this.state.image != '') {
      //Check for the Name TextInput
      if (this.state.login != '') {
        //Check for the Email TextInput
        //alert('Success')
      if (this.state.email != '') {
        //Check for the Email TextInput
       // alert('Success')
       if (this.state.password != '') {
        //Check for the Email TextInput
       // alert('Success')
      if (this.state.adresse != '') {
        //Check for the Email TextInput
       // alert('Success')
       if (this.state.role != '') {
        //Check for the Email TextInput
        if (!this.validateEmail(this.state.email)) {
alert("Invalid email")
}else {
alert('Success');
}
      
      } else {
        alert('Please Enter role ');
      } 
      } else {
        alert('Please Enter addresse');
      } 
      } else {
        alert('Please Enter password');
      } 
      } else {
        alert('Please Enter email');
      } 
      } else {
      alert('Please Enter login');
    }
    } else {
      alert('Please Enter image');
    }
    
      
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    });
    
};

  	clickme=()=>{
		var data = this.state.role;
		if(data==""){
			alert("Please Select a Role");
		}else{
			alert(data);
		}
		
	}


    myfun=()=>{
  //alert('clicked');

  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('Image Picker Error: ', response.error);
    }

    else {
      let source = { uri: response.uri };

      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({
        image: source
      });
    }
  });
}
}


  
