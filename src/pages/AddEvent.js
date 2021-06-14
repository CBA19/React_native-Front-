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
import DatePicker from 'react-native-datepicker';
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


export default class AddEvent extends Component<{}> {
    
    static navigationOptions= ({navigation}) =>({
		  title: 'Events ',
		headerRight:<TouchableOpacity onPress={() => navigation.navigate("ListeEvents")}
		style={{backgroundColor:'#455a64', margin:20,padding:20}}>
		<Text style={{color:'#fff'}}>Events</Text></TouchableOpacity>
		});


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
            name="description"
            placeholder="Description"
            onChangeText={(description)=> this.setState({description})}
            value={this.state.description}
          />
               <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
            name="titre"
            placeholder="Titre"
            onChangeText={(titre)=> this.setState({titre})}
            value={this.state.titre}
          />
          <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
            name="lieu"
            placeholder="Lieu"
            onChangeText={(lieu)=> this.setState({lieu})}
            value={this.state.lieu}
          />

       
         <DatePicker
        style={{width: 200}}
        date={this.state.date_event}
        mode="date"
        placeholder="select date of event"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date_event) => {this.setState({date_event: date_event})}}
      />
        <TouchableOpacity style={styles.button} onPress={this.AjoutEvent}>
          <Text style={styles.buttonText}>Add Event</Text>
        </TouchableOpacity>
			</View>
       </ScrollView>
    </SafeAreaView>
			)
	}

  constructor(props){
    super(props);
    this.state ={lieu:'',description: '', date_event:'',image: null , titre:'',userId:null,longitude:null,
    latitude:null,token:''};
  }

fetchLocal=async() =>{
  /*const { params } = this.props.navigation.state;
	const {navigate} = this.props.navigation;
  const longitude= params.longitude;
  const latitude =params.latitude;
  
   this.setState({
        lieu:"Longitude: "+longitude+" Latitude: "+latitude,
         
      });*/
        
   const { params } = this.props.navigation.state;
	const {navigate} = this.props.navigation;
  var token1=params.token ;
  
  this.state.token=token1;
    //alert(this.state.token);
      
}
componentDidMount(){
		this.fetchLocal();
	}

AjoutEvent =()=> {

  fetch("http://192.168.13.1:3000/api/event/CreatEvent", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'multipart/form-data',
      'token':this.state.token,
    },
    body: createFormData(this.state.image, 
    { Lieu: this.state.lieu,
    Description:this.state.description,
    Titre:this.state.titre,
    Date_event:this.state.date_event,
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


  
