import React, { Component } from 'react';
import { AppRegistry,View,Text,
StyleSheet,FlatList,Image,StatusBar,
TouchableOpacity,Button, RefreshControl,Navigator } from 'react-native';
import Web3 from "../../web3.js";
export default class DetailsCas extends Component{

  static navigationOptions= ({navigation}) =>({
		  title: 'Les cas ',
		headerRight:<TouchableOpacity onPress={() => navigation.navigate("ListeCas")}
		style={{backgroundColor:'#455a64', margin:20,padding:20}}>
		<Text style={{color:'#fff'}}>Return</Text></TouchableOpacity>
		});


	state={
		data:[],
		refreshing: false,
      loading: true
   		
	};
	fetchData = async() =>{
		const { params } = this.props.navigation.state;
        const response =  await fetch('http://192.168.13.1:3000/api/cas/getCas/'+ params.id);
		const cas = await response.json(); // products have array data
		this.setState({data: cas}); // filled data with dynamic array
	};

	async componentWillMount() {
	await	this.fetchData();
   
  }
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
		  renderItem={({item})=>
          
		  <View>
		   <Image  style={{width:100, height: 100}}
          			
          			source={{uri: item.image }} 
                />
          
	<Text style={{color:'#fff', fontWeight:'bold'}}>Localisation:{item.localisation}</Text>
    <Text style={{color:'#fff', fontWeight:'bold'}}>Description:{item.description}</Text>
    <Text style={{color:'#fff', fontWeight:'bold'}}>Created-at: {item.created_at}</Text>
		  </View>
		  
		   } />
         <TouchableOpacity style={styles.button}
                onPress={this.truffle}>
             <Text style={styles.buttonText}>donate to this case</Text>
           </TouchableOpacity>
		
		</View>
		);
	}

   truffle= () => {

    fetch('http://192.168.13.1:3000/api/cas/payCas')
    .then((response) => response.json())
    .then((res) => {

        if(res.success === true)
        {
          
           
           
           alert("transaction done");
        }
        else {
          alert(res.message);
        }

    })
    .done();
  }


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
  }
})
AppRegistry.registerComponent('DetailsCas', () => DetailsCas);