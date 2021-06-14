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
  takePhotoButtonTitle: 'Take photo with your camera',
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


export default class AjouterCas extends Component<{}> {
    
    static navigationOptions= ({navigation}) =>({
		  title: 'Les cas ',
		headerRight:<TouchableOpacity onPress={() => navigation.navigate("ListeCas")}
		style={{backgroundColor:'#455a64', margin:20,padding:20}}>
		<Text style={{color:'#fff'}}>Return</Text></TouchableOpacity>
		});


	render() {
    const { image } = this.state
    
    
		return(
       <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
			<View style={styles.container}>
 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity style={styles.button} 
        //value={(localisation)=> this.setState({localisation})}
        onPress={() => this.props.navigation.push('MapCas')}>
          <Text style={styles.buttonText}>Localisation</Text>
        </TouchableOpacity>
                 <Text style={styles.buttonText}>Localisation: {this.state.localisation}</Text>

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
            name="description"
            placeholder="Description"
            onChangeText={(description)=> this.setState({description})}
            value={this.state.description}
          />

   
        <TouchableOpacity style={styles.button} onPress={this.AjoutCas}>
          <Text style={styles.buttonText}>Ajouter cas</Text>
        </TouchableOpacity>
			</View>
       </ScrollView>
    </SafeAreaView>
			)
	}

  constructor(props){
    super(props);
    this.state ={localisation:'',description: '', created_at:'',image: null};
  }

fetchLocal=async() =>{
  const { params } = this.props.navigation.state;
  const longitude= params.longitude;
  const latitude =params.latitude;
   this.setState({
        localisation:"Longitude: "+longitude+" Latitude: "+latitude,
      });
}
componentDidMount(){
		this.fetchLocal();
	}

AjoutCas = () => {
  
  fetch("http://192.168.13.1:3000/api/cas/createCas", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'multipart/form-data',
    },
    body: createFormData(this.state.image, 
    { Localisation: this.state.localisation,
    Description:this.state.description,
 }),
  })
    .then(response => response.json())
    .then(response => {
      console.log("upload succes", response);
      alert("Upload success!");
      this.setState({ image: null });
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    });
};




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


  
