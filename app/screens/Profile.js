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

import { NavigationActions } from 'react-navigation';

import { StackNavigator } from 'react-navigation';

import { onSignOut, url } from "../Auth";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("username").then((value) => {this.setState({"username": value});}).done();
    AsyncStorage.getItem("firstName").then((value) => {this.setState({"firstName": value});}).done();
    AsyncStorage.getItem("lastName").then((value) => {this.setState({"lastName": value});}).done();
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
        <Text>{this.state.firstName} {this.state.lastName}</Text> 
        <Text>{this.state.username}</Text> 
        <Button rounded buttonStyle={styles.button} textStyle={{ fontWeight: "700" }} title='SIGN OUT' containerStyle={{ marginTop: 20 }} onPress={() => onSignOut().then(() => this.props.navigation.dispatch(NavigationActions.reset({ index: 0, key: null, actions: [NavigationActions.navigate({ routeName: 'SignedOut' })],})))}/>
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
  button: {
    backgroundColor: "#ff5e57",
    width: 300,
    height: 45,
    marginTop: 20,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
});