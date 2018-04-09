import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import { Header, Button } from 'react-native-elements';

// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ }}
          centerComponent={{ text: 'Home', style: { color: '#fff', fontSize: 20 } }}
          outerContainerStyles={{ backgroundColor: '#ff5e57', borderBottomWidth:0 }}
          rightComponent={{  }}
        />
      <View style={styles.container}>
        <Button
          raised
          buttonStyle={styles.button}
          icon={{name: 'circle-with-plus', type: 'entypo'}}
          title='CREATE HOTSPOT' />
        <View style={styles.map}>
        {/* <MapView
        provider={PROVIDER_GOOGLE} 
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        /> */}
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffdd59',
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: "700",
    color: '#ffffff',
    margin: 10,
  },
  button: {
    backgroundColor: '#ff5e57',
    margin: 10,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});