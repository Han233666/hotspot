import React, { Component } from 'react';
import { 
  View, 
  Text,
  Dimensions, 
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Header, Button } from 'react-native-elements';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';


var config = require('../Config');

let id = 1;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      title: "",
      description: "",
      latitude: 40.0025,
      longitude: -105.2428,
      region: {
        latitude: 40.0025,
        longitude: -105.2428,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      error: null,
      markers: [],
      results: [],
    };
  }

  viewSpot() {
    try {
      fetch("http://"+config.server+":5000/api/view/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success=='true') {
          this.setState({results: responseJson.results});
        }
        else {
          Alert.alert("Unable to retrieve hotspots.");
        }
      })
    }
    catch (error) {
      Alert.alert('Cannot fetch data.');
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        error: null,
      });
    },
    (error) => this.setState({ error: error.message }),{
      enableHighAccuracy: false, 
      timeout: 200000, 
      maximumAge: 1000 
      },
    );
    this.viewSpot();
  }
    
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'close', color: '#fff', onPress: this.props.closeMap }}
          centerComponent={{ text: 'HOTSPOTS', style: { color: '#fff', fontSize: 20, fontWeight: "900" }}}
          outerContainerStyles={{ backgroundColor: '#ff5e57', borderBottomWidth:0 }}
          rightComponent={{  }}
        />
        <MapView 
          style={styles.map} 
          provider={PROVIDER_GOOGLE} 
          initialRegion={this.state.region}
        >
        {this.state.results.map((marker) => (
          <Marker
            title={marker.title + " by " + marker.username}
            description={marker.description}
            key={id++}
            coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
            pinColor='#ff5e57'
          />
        ))}
        </MapView>
        <TouchableOpacity
            style={styles.bubble}
          >
            <Text>Tap on a spot to see more details!</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  map: {
    width: Dimensions.get('window').width,
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
}