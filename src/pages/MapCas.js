/*This is an Example of React Native Map*/
import React from 'react';
import { StyleSheet, Text, View , TextInput,Dimensions,Button,TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';


// Disable yellow box warning messages
console.disableYellowBox = true;

export default class MapCas extends React.Component {
  onRegionChange(region) {
    this.setState({ region });
  }

	state={
	 longitude:null,
   latitude:null,
}
  render() {
    var mapStyle=[{"elementType": "geometry", "stylers": [{"color": "#242f3e"}]},{"elementType": "labels.text.fill","stylers": [{"color": "#746855"}]},{"elementType": "labels.text.stroke","stylers": [{"color": "#242f3e"}]},{"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#263c3f"}]},{"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#6b9a76"}]},{"featureType": "road","elementType": "geometry","stylers": [{"color": "#38414e"}]},{"featureType": "road","elementType": "geometry.stroke","stylers": [{"color": "#212a37"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#9ca5b3"}]},{"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#746855"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#1f2835"}]},{"featureType": "road.highway","elementType": "labels.text.fill","stylers": [{"color": "#f3d19c"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#2f3948"}]},{"featureType": "transit.station","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#17263c"}]},{"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#515c6d"}]},{"featureType": "water","elementType": "labels.text.stroke","stylers": [{"color": "#17263c"}]}];
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 36.78799013208581,
            longitude: 10.2075507890873,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          customMapStyle={mapStyle}
        >
          <Marker
            draggable
            coordinate={{
              latitude: 36.78799013208581,
              longitude: 10.2075507890873,
            }}
            onDragEnd={(e) => 
            //alert(JSON.stringify(e.nativeEvent.coordinate))
            /*, this.props.navigation.push('AjouterCas',
            {latitude: JSON.stringify(e.nativeEvent.coordinate.latitude),
            longitude: JSON.stringify(e.nativeEvent.coordinate.longitude),
            }
            )*/
                   this.setState({
        latitude:JSON.stringify(e.nativeEvent.coordinate.latitude),
        longitude:JSON.stringify(e.nativeEvent.coordinate.longitude),
      })
            }
     
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>
      
       
      <View style={styles.btnContainer}>
      <TouchableOpacity style={{backgroundColor:'#455a64', margin:20,padding:20}} 
      onPress={(e) =>
      this.props.navigation.push('AjouterCas',
            {latitude: this.state.latitude,
            longitude: this.state.longitude,
            }
            )
      }
      >
      <Text style={{color:'#fff'}}>Pick location</Text>
      </TouchableOpacity>
      </View>
      </View>
      
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    //width: Dimensions.get("window").width - 80,
  },
  map: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
    btnContainer: {
    //width: Dimensions.get("window").width - 20,
    position: "absolute",
    bottom: 100,
    left: 10
  },
    deatilSection: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    justifyContent: "flex-start"
  }
});