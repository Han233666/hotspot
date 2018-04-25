import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  ImageBackground
} from 'react-native';

import { Header, Button } from 'react-native-elements';

import Map from './Map';
import Spot from './Spot'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: false,
      spot: false,
    };
  }

  setMapVisible(visible) {
    this.setState({map: visible});
  }

  setSpotVisible(visible) {
    this.setState({spot: visible});
  }

  render() {
    return (
      // <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/hotspot_bg.png')} style={styles.backgroundImage}>
        <Modal animationType={"slide"} visible={this.state.map} onRequestClose={() => {}}>
          <Map closeMap={() => {this.setState({map: false})}} />
        </Modal>
        <Modal animationType={"slide"} visible={this.state.spot} onRequestClose={() => {}}>
          <Spot closeSpot={() => {this.setState({spot: false})}} />
        </Modal>
        <Header
          leftComponent={{ }}
          centerComponent={{ text: 'HOME', style: { color: '#000', fontSize: 20, fontWeight: "900" } }}
          outerContainerStyles={{ backgroundColor: '#fff', borderBottomWidth:0 }}
          rightComponent={{  }}
        />
         
      <View style={styles.group}>
      <Text style={{color:'#fff',fontSize: 24, fontWeight: "800", textAlign:'center', marginTop:65}}>Welcome to Hotspot.</Text>
      <Text style={{color:'#fff',fontSize: 16, fontWeight: "500", textAlign:'center', marginTop:5, margin:30}}>Find fun events nearby or add your own spot for people to see.</Text>
     
        <Button
          raised
          buttonStyle={styles.button}
          textStyle={{fontSize: 16, fontWeight: "700"}}
          icon={{name: 'circle-with-plus', type: 'entypo', size:14}}
          onPress={()=>this.setSpotVisible(true)}
          title='ADD SPOT' />
        <Button
          raised
          buttonStyle={styles.button}
          textStyle={{fontSize: 16, fontWeight: "700"}}
          icon={{name: 'compass', type: 'entypo', size:14}}
          onPress={()=>this.setMapVisible(true)}
          title='VIEW SPOTS' />  
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  group: {
    alignItems:'center',
  },
  backgroundImage:{ 
    flex: 1,
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
    marginTop: 10,
    marginBottom: 10,
    height: 45,
    borderWidth: 0,
    borderRadius: 5,
    width: Dimensions.get('window').width*.8
  },
  map: {
    flex:1,
    width: 300,
    height: 300,
  },
});