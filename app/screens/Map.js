import React, { Component } from 'react';
import { 
  View, 
  Text,
  Dimensions, 
  TouchableOpacity,
} from 'react-native';

import { Header, Button } from 'react-native-elements';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

let id = 0;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 40.0025,
        longitude: -105.2428,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      error: null,
      markers: [],
    };
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          title: "gr9 party",
          description: "this is a super chill, super relax place. address is 2402 fun ave",
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: '#ff5e57',
        },
      ],
    });
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
  }
    
  render() {
    // const spots = [
    //   {
    //     coordinate: {
    //       latitude: 40.0025,
    //       longitude: -105.2428,
    //     },
    //     title: 'gr9 party',
    //     description: "this is fun"
    //   },
    // ]
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
          onPress={(e) => this.onMapPress(e)}
        >
        {this.state.markers.map((marker) => (
          <Marker
            title={marker.title}
            description={marker.coordinate}
            key={marker.key}
            coordinate={marker.coordinate}
            pinColor={marker.color}
          />
        ))}
        </MapView>
        <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}
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