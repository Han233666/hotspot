import React, { Component } from 'react';
import { View, Text,Dimensions, } from 'react-native';
import { Header, Button, FormLabel, FormInput } from 'react-native-elements';

export default class Spot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      title: '',
      description: '',
      latitude:'',
      longitude:'',
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
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

  addSpot() {
    const body = {
      username: this.state.username,
      title: this.state.title,
      description: this.state.description,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    }
    try {
      fetch("http://167.99.104.42:5000/api/add/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.ok) {
          this.props.closeSpot;
        }
        else {
          Alert.alert(responseJson.message);
        }
      })
    }
    catch (error) {
      Alert.alert(error);
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Header
            leftComponent={{ icon: 'close', color: '#fff', onPress: this.props.closeSpot }}
            centerComponent={{ text: 'ADD HOTSPOT', style: { color: '#fff', fontSize: 20, fontWeight: "900" }}}
            outerContainerStyles={{ backgroundColor: '#ff5e57', borderBottomWidth:0 }}
            rightComponent={{  }}
          />
          <View style={styles.form}>
            <FormLabel labelStyle={{color:"#000"}}>TITLE</FormLabel>
            <FormInput 
              inputStyle={{color:"#000",padding:5,paddingRight:25}} 
              containerStyle={{width: Dimensions.get('window').width*.95, borderColor: '#ccc',borderRightWidth: 1, borderLeftWidth: 1, borderTopWidth: 1, borderBottomWidth: 1}} 
              returnKeyType = {"next"} 
              onSubmitEditing={(event) => {this.descinput.focus()}} 
              value={this.state.title} 
              ref={input => this.titleinput = input} 
              onChangeText={(title) => {this.setState({title});}} autoCapitalize="none" 
            />
            <FormLabel labelStyle={{color:"#000"}}>DESCRIPTION</FormLabel>
            <FormInput 
              inputStyle={{color:"#000",padding:5,paddingRight:25}} 
              containerStyle={{width: Dimensions.get('window').width*.95, height: 80, borderColor: '#ccc',borderRightWidth: 1, borderLeftWidth: 1, borderTopWidth: 1, borderBottomWidth: 1}} 
              multiline
              numberOfLines={3}
              value={this.state.description} 
              ref={input => this.descinput = input} 
              onChangeText={(description) => {this.setState({description});}} autoCapitalize="none"
            />
        <Button
          title="ADD HOTSPOT"
          onPress={() => this.addSpot()}
          textStyle={{ fontWeight: "700" }}
          buttonStyle={styles.button}
          containerStyle={{ marginTop: 20 }}
        />
        </View>
        </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  title: {
    fontSize: 35,
    fontWeight: "700",
    color: '#ff4757',
    marginBottom: 40,
    fontWeight: "900",
  },
  form: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: Dimensions.get('window').width*.95, height: 80, borderColor: '#ccc',borderRightWidth: 1, borderLeftWidth: 1, borderTopWidth: 1, borderBottomWidth: 1
  },
};