import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

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
      <View style={styles.container}>
        <Modal animationType={"slide"} visible={this.state.map} onRequestClose={() => {}}>
          <Map closeMap={() => {this.setState({map: false})}} />
        </Modal>
        <Modal animationType={"slide"} visible={this.state.spot} onRequestClose={() => {}}>
          <Spot closeSpot={() => {this.setState({spot: false})}} />
        </Modal>
        <Header
          leftComponent={{ }}
          centerComponent={{ text: 'HOME', style: { color: '#fff', fontSize: 20, fontWeight: "900" } }}
          outerContainerStyles={{ backgroundColor: '#ff5e57', borderBottomWidth:0 }}
          rightComponent={{  }}
        />
      <View style={styles.group}>
        <Button
          raised
          buttonStyle={styles.button}
          textStyle={{fontSize: 25, fontWeight: "900"}}
          icon={{name: 'circle-with-plus', type: 'entypo', size:25}}
          onPress={()=>this.setSpotVisible(true)}
          title='ADD SPOT' />
        <Button
          raised
          buttonStyle={styles.button}
          textStyle={{fontSize: 25, fontWeight: "900"}}
          icon={{name: 'compass', type: 'entypo', size:25}}
          onPress={()=>this.setMapVisible(true)}
          title='VIEW SPOTS' />  
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  group: {
    flex: 1,
    alignItems:'center',
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
    marginTop: 5,
    height: Dimensions.get('window').height*.4,
    width: Dimensions.get('window').width*.98
  },
  map: {
    flex:1,
    width: 300,
    height: 300,
  },
});