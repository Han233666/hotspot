import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert
} from 'react-native';
import { Avatar,Header,Button,List,ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

import { NavigationActions } from 'react-navigation';

import { StackNavigator } from 'react-navigation';

import { onSignOut, url } from "../Auth";

var config = require('../Config');

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      spots: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("username").then((value) => {this.setState({"username": value});}).done();
    AsyncStorage.getItem("firstName").then((value) => {this.setState({"firstName": value});}).done();
    AsyncStorage.getItem("lastName").then((value) => {this.setState({"lastName": value});}).done();
    this.loadSpots();
  }

  removeSpot(item) {
    const body = {
      username: item.username,
      title: item.title,
      description: item.description,
      latitude: item.latitude,
      longitude: item.longitude,
    }
    try {
      fetch("http://"+config.server+":5000/api/remove/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson.message);
      })
    }
    catch (error) {
      Alert.alert('Cannot fetch data.');
    }
  }

  loadSpots() {
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
          this.setState({spots: responseJson.results});
        }
        else {
          Alert.alert("Unable to retrieve spots.");
        }
      })
    }
    catch (error) {
      Alert.alert('Cannot fetch data.');
    }
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
          <Avatar
            large
            rounded
            source={require('../../assets/images/hotspot_icon.png')}
            containerStyle={{margin:15}}
          />
          <Text style={{fontSize: 25, fontWeight: "800",marginBottom:10}}>{this.state.firstName} {this.state.lastName}</Text> 
          <Text style={{fontSize: 15, fontWeight: "500"}}>{this.state.username}</Text> 
      </View>
      <List>
              {
                this.state.spots.map((item, i) => (
                  <ListItem
                    rightIcon={{name:'close',color:'#ff5e57'}}
                    key={i}
                    title={item.title}
                    subtitle={item.description}
                    onPressRightIcon={() => this.removeSpot(item)}
                  />
                ))
              }
            </List>
            <Button rounded buttonStyle={styles.button} textStyle={{ fontWeight: "700" }} title='SIGN OUT' containerStyle={{ marginTop: 20 }} onPress={() => onSignOut().then(() => this.props.navigation.dispatch(NavigationActions.reset({ index: 0, key: null, actions: [NavigationActions.navigate({ routeName: 'SignedOut' })],})))}/>
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