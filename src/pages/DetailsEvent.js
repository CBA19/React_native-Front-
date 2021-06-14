import React, { Component } from 'react';
import { AppRegistry,View,Text,
StyleSheet,FlatList,Image,StatusBar,
TouchableOpacity,Button, RefreshControl,Navigator } from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';
export default class DetailsEvent extends Component{
	static navigationOptions= ({navigation}) =>({
		  title: 'Les cas ',
		headerRight:<TouchableOpacity onPress={() => navigation.navigate("ListeEvents")}
		style={{backgroundColor:'#455a64', margin:20,padding:20}}>
		<Text style={{color:'#fff'}}>Return</Text></TouchableOpacity>
		});


	state={
		data:[],
		refreshing: false
   		
	};
	fetchData = async() =>{
		const { params } = this.props.navigation.state;
        const response =  await fetch('http://192.168.13.1:3000/api/event/getEvent/'+ params.id);
		const event = await response.json(); // products have array data
		this.setState({data: event}); // filled data with dynamic array
	};
	componentDidMount(){
		this.fetchData();
	};
	_onRefresh(){
		this.setState({refreshing: true});
		this.fetchData().then(() =>{
			this.setState({refreshing: false})
		});
	}
 
 
	render(){

		 const { params } = this.props.navigation.state;
		 const {navigate} = this.props.navigation;
		return(
		 <View style={styles.container}>
		  <FlatList
       data={this.state.data}
       keyExtractor={(item,index) => index.toString()}
       renderItem={({item}) =>
      
       <View>
        <Image  style={{width:100, height: 100}}
          			source={{uri: item.image }} 
                />
          <Text style={{color:'#fff', fontWeight:'bold'}}>Localisation:{item.lieu}</Text>
          <Text style={{color:'#fff', fontWeight:'bold'}}>Description:{item.description}</Text>
          <Text style={{color:'#fff', fontWeight:'bold'}}>Date_event:{item.date_event}</Text>
           <Text style={{color:'#fff', fontWeight:'bold'}}>Title:{item.titre}</Text>
           
              <TouchableOpacity style={styles.button} 
                onPress={() => this.DeleteEvent(item._id)}
               >
             <Text style={styles.buttonText}>Delete event</Text>
           </TouchableOpacity>

                
         </View>

       }

       />

		</View>
		);
	}


DeleteEvent =(id)=> {

  fetch("http://192.168.13.1:3000/api/event/deleteEvent/"+id, {
    method: 'Delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'multipart/form-data'
    }
  })
    .then(response => response.json())
    .then(res => {
      alert(res.message);
    })
    .catch(error => {
      console.log(" error", error);
      alert("deleting failed!");
    });
};














}














const styles = StyleSheet.create({
	  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},
	productBox:{
		padding:5,margin:10,borderColor:'orange',borderBottomWidth:1
	},
	price:{
		padding:5, color:'orange',fontWeight:'bold',textAlign:'center'
	},
	proName:{
		padding:5,color:'blue',textAlign:'center'
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
  }
})
AppRegistry.registerComponent('DetailsCas', () => DetailsCas);