import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  Image,
  Button,
  Navigator,
  AppRegistry,
  RefreshControl
} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  textStyle: {
      color: "#fff",
      fontSize: 18
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
    left: 16,
    color:'#7FFFD4'
  },
    header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default class ListeCas extends Component {
	static navigationOptions= ({navigation}) =>({
		  title: 'Les cas ',
		headerRight:<TouchableOpacity onPress={() => navigation.navigate("AjouterCas")} 
    style={{backgroundColor:'#455a64', margin:20,padding:20}}>
		<Text style={{color:'#fff'}}>Add case</Text></TouchableOpacity>
		});



    state ={
    data:[],
    img:null,
    refreshing: false,
    id:null
  }


  fetchData= async()=>{
    const response = await fetch('http://192.168.13.1:3000/api/cas/ListeCas');
    const ListCas = await response.json();
    this.setState({data: ListCas});

  }



/*
    DataImage= async(id)=>{
        fetch('http://192.168.75.1:3000/api/cas/getImageCas/'+id)
       .then((response) => response.json())
       .then((res) => {

        if(res.success === true)
        {
                 
           var image=res.message;
           
          this.setState({
        img:image,
      });
     //alert(this.state.img);
         }
     
        
  
    
    });
    }*/

    componentDidMount(){
  this.fetchData();  
};
	_onRefresh(){
		this.setState({refreshing: true});
		this.fetchData().then(() =>{
			this.setState({refreshing: false})
		});
	}


	render() {
    const { img } = this.state ;
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
          <Text style={{color:'#fff', fontWeight:'bold'}}>Localisation:{item.localisation}</Text>
         
          <Text style={{color:'#fff', fontWeight:'bold'}}>Description:{item.description}</Text>
           
          
           
                
               
          <Text style={{color:'#fff', fontWeight:'bold'}}>Created-at: {item.created_at}</Text>

                <TouchableOpacity style={styles.button} 
                onPress={() => this.props.navigation.push('DetailsCas', {id: item._id})}>
             <Text style={styles.buttonText}>View Details</Text>
           </TouchableOpacity>
         </View>

       }
       		  
             
        refreshControl={
			  <RefreshControl
			  refreshing = {this.state.refreshing}
			  onRefresh={this._onRefresh.bind(this)}
			  />
		  }

       />

      
			</View>
			)
	}
}

AppRegistry.registerComponent('ListeCas', () => ListeCas);