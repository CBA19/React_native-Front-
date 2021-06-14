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
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';


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

export default class ListeEvents extends Component {

    state ={
    data:[],
    img:null,
    refreshing: false,
    id:null
  }


  fetchData= async()=>{
    const response = await fetch('http://192.168.13.1:3000/api/event/ListeEvents');
    const ListEvent = await response.json();
    this.setState({data: ListEvent});

  }




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
          <Text style={{color:'#fff', fontWeight:'bold'}}>Localisation:{item.lieu}</Text>
          <Text style={{color:'#fff', fontWeight:'bold'}}>Description:{item.description}</Text>
          <Text style={{color:'#fff', fontWeight:'bold'}}>Date_event:{item.date_event}</Text>
          <Text style={{color:'#fff', fontWeight:'bold'}}>Title:{item.titre}</Text>
           
            
       <Icon2 name='check' size={28}  onPress={() => this.Participe(item._id)}
     style={styles.icon}  style={{color:'#333'}} /><Text style={{color:'#333'}}>Participe</Text>

     <Icon1 name='star' size={28}  onPress={() => this.Interesse(item._id)}
     style={styles.icon}  style={{color:'#333'}} /><Text style={{color:'#333'}}>Interesse</Text>

                <TouchableOpacity style={styles.button} 
                onPress={() => this.props.navigation.push('DetailsEvent', {id: item._id})}
               >
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



Participe= (id) => {
  fetch("http://192.168.144.1:3000/api/event/participe/"+id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'multipart/form-data'
    }
  })
    .then(response => response.json())
    .then(response => {
      alert(" success!");
      
    })
    .catch(error => {
      console.log(" error", error);
      alert(" failed!");
    });
};

Interesse= (id) => {
  fetch("http://192.168.144.1:3000/api/event/interesse/"+id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'multipart/form-data'
    }
  })
    .then(response => response.json())
    .then(response => {
      alert(" success!");
      
    })
    .catch(error => {
      console.log(" error", error);
      alert(" failed!");
    });
};

}

AppRegistry.registerComponent('ListeEvents', () => ListeEvents);