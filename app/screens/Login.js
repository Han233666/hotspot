import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { Header,Button,FormLabel,FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  signIn() {
    const bodyInfo = {
      username: this.state.username,
      password: this.state.password,
    }
    try {
      fetch("http://localhost:5000/api/login/", {
        method: "POST",
        body: JSON.stringify(bodyInfo),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        Alert.alert(JSON.stringify(response));
        if (response.ok) {
          response.json().then((response) => {
            try {

            } catch (error) {
              Alert.alert('Error', 'Unable to Store Information');
            }
          })
          .catch(error => alert("Unable to Retrieve JSON"));
        }
        else{
          Alert.alert('Error','Incorrect Email Address or Password');
        }
      })
    }
    catch (error) {
      Alert.alert(error);
    }
  }

  signUp() {
    const bodyInfo = {
      username: this.state.username,
      password: this.state.password,
    }
    try {
      fetch("http://localhost:5000/api/register", {
        method: "POST",
        body: JSON.stringify(bodyInfo),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        Alert.alert(JSON.stringify(response));
        if (response.ok) {
          response.json().then((response) => {
            try {

            } catch (error) {
              Alert.alert('Error', 'Unable to Store Information');
            }
          })
          .catch(error => alert("Unable to Retrieve JSON"));
        }
        else{
          Alert.alert('Error','Incorrect Email Address or Password');
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
        <KeyboardAvoidingView behavior="position">
        <Text style={styles.title}>
          Hotspot
        </Text>
          <View style={styles.form}>
            <FormLabel labelStyle={{color:"#000"}}>Username</FormLabel>
            <FormInput
              inputStyle={{color:"#000"}}
              containerStyle={styles.input}
              returnKeyType = {"next"}
              onSubmitEditing={(event) => {this.passwordinput.focus()}}
              value={this.state.username}
              ref={input => this.userinput = input}
              onChangeText={(username) => {this.setState({username});}} autoCapitalize="none"
            />
            <FormLabel labelStyle={{color:"#000"}}>Password</FormLabel>
            <FormInput
              inputStyle={{color:"#000"}}
              containerStyle={styles.input}
              value={this.state.password}
              ref={input => this.passwordinput = input}
              onChangeText={(password) => {this.setState({password});}} secureTextEntry
            />
        <Button
          title="Sign In"
          onPress={() => this.signIn()}
          textStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#ff5e57",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 20 }}
        />
        <Button
          title="Sign Up"
          onPress={() => this.signUp()}
          textStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#ff5e57",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 20 }}
        />
        </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffdd59',
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: "700",
    color: '#ffffff',
    margin: 10,
  },
  form: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    maxWidth: 350,
  },
});
