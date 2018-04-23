import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import { Header,Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("username").then((value) => {this.setState({"username": value});}).done();
  }

  render() {
    return (
      <View style={styles.container}>
      <Header
          leftComponent={{ }}
          centerComponent={{ text: 'PROFILE', style: { color: '#fff', fontSize: 20, fontWeight: "900" } }}
          outerContainerStyles={{ backgroundColor: '#ff5e57', borderBottomWidth:0 }}
          rightComponent={{  }}
        />
        <View style={styles.group}>
        <Text>{this.state.username}</Text> 
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
});