import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  Modal,
  TouchableHighlight
} from 'react-native';
import { Header,Button,FormLabel,FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

import { NavigationActions } from 'react-navigation';

import { USER_KEY } from "../Auth";

var config = require('../Config');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      signUp: false,
      disabled: true,
      loading: false,
    };
  }

  showSignUp(visible) {
    this.setState({signUp: visible});
  }

  signIn() {
    const body = {
      username: this.state.username,
      password: this.state.password,
    }
    try {
      fetch("http://"+config.server+":5000/api/login/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.info.success==='true') {
          AsyncStorage.setItem("username",this.state.username);
          AsyncStorage.setItem("firstName",responseJson.user.firstName);
          AsyncStorage.setItem("lastName",responseJson.user.lastName);
          this.props.navigation.dispatch(this.props.navigation.dispatch(NavigationActions.reset({ index: 0, key: null, actions: [NavigationActions.navigate({ routeName: 'SignedIn' })], })));
        }
        else {
          Alert.alert(responseJson.info.message);
        }
      })
    }
    catch (error) {
      Alert.alert(error);
    }
  }

  isValid() {
    if(this.state.firstName.trim()== "" || this.state.lastName.trim()== "" || this.state.username.trim()== "" || this.state.password.trim() == "") {
      this.setState({disabled: true});
    }
    else {
      this.setState({disabled: false});
    }
  }

  signUp() {  
    this.setState({loading: true});
    const body = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password,
    }
    try {
      fetch("http://"+config.server+":5000/api/register/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.info.success=='true'){
          () => this.showSignUp(false);
          Alert.alert(responseJson.info.message);
        }
        else {
          Alert.alert(responseJson.info.message);
        }
      })
      this.setState({loading: false});
    }
    catch (error) {
      Alert.alert(error);
      this.setState({loading: false});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal animationType={"slide"} visible={this.state.signUp} onRequestClose={() => {}}>
        <Header
          leftComponent={{ icon: 'close', color: '#fff', onPress: () => this.showSignUp(false) }}
          centerComponent={{ text: 'SIGN UP', style: { color: '#fff', fontSize: 20, fontWeight: "900" }}}
          outerContainerStyles={{ backgroundColor: '#ff5e57', borderBottomWidth:0 }}
          rightComponent={{  }}
        />
          <View style={styles.form}>
            <FormLabel labelStyle={{color:"#000"}}>FIRST NAME</FormLabel>
            <FormInput 
              inputStyle={{color:"#000"}} 
              containerStyle={styles.input} 
              returnKeyType = {"next"} 
              onSubmitEditing={(event) => {this.lastnameinput.focus()}} 
              value={this.state.firstName} 
              ref={input => this.firstnameinput = input} 
              onChangeText={(firstName) => {this.setState({firstName});this.isValid()}}
            />
            <FormLabel labelStyle={{color:"#000"}}>LAST NAME</FormLabel>
            <FormInput 
              inputStyle={{color:"#000"}} 
              containerStyle={styles.input} 
              returnKeyType = {"next"} 
              onSubmitEditing={(event) => {this.userinput.focus()}} 
              value={this.state.lastName} 
              ref={input => this.lastnameinput = input} 
              onChangeText={(lastName) => {this.setState({lastName});this.isValid()}}
            />
            <FormLabel labelStyle={{color:"#000"}}>USERNAME</FormLabel>
            <FormInput 
              inputStyle={{color:"#000"}} 
              containerStyle={styles.input} 
              returnKeyType = {"next"} 
              onSubmitEditing={(event) => {this.passwordinput.focus()}} 
              value={this.state.username} 
              ref={input => this.userinput = input} 
              onChangeText={(username) => {this.setState({username});this.isValid()}} autoCapitalize="none" 
            />
            <FormLabel labelStyle={{color:"#000"}}>PASSWORD</FormLabel>
            <FormInput 
              inputStyle={{color:"#000"}} 
              containerStyle={styles.input} 
              value={this.state.password} 
              ref={input => this.passwordinput = input} 
              onChangeText={(password) => {this.setState({password});this.isValid()}} secureTextEntry
            />
            <Button
            title={this.state.loading ? "":"SIGN UP"}
            loading={this.state.loading} 
            disabled={this.state.disabled} 
            onPress={() => this.signUp()}
            textStyle={{ fontWeight: "700" }}
            buttonStyle={styles.button}
            containerStyle={{ marginTop: 20 }}
          />
        </View>
        </Modal>
        <KeyboardAvoidingView behavior="position">
        <Text style={styles.title}>
          HOTSPOT
        </Text>
          <View style={styles.form}>
            <FormLabel labelStyle={{color:"#000"}}>USERNAME</FormLabel>
            <FormInput 
              inputStyle={{color:"#000"}} 
              containerStyle={styles.input} 
              returnKeyType = {"next"} 
              onSubmitEditing={(event) => {this.passwordinput.focus()}} 
              value={this.state.username} 
              ref={input => this.userinput = input} 
              onChangeText={(username) => {this.setState({username});}} autoCapitalize="none" 
            />
            <FormLabel labelStyle={{color:"#000"}}>PASSWORD</FormLabel>
            <FormInput 
              inputStyle={{color:"#000"}} 
              containerStyle={styles.input} 
              value={this.state.password} 
              ref={input => this.passwordinput = input} 
              onChangeText={(password) => {this.setState({password});}} secureTextEntry
            />
        <Button
          title="SIGN IN"
          onPress={() => this.signIn()}
          textStyle={{ fontWeight: "700" }}
          buttonStyle={styles.button}
          containerStyle={{ marginTop: 20 }}
        />
        <TouchableHighlight onPress={() => this.showSignUp(true)} underlayColor="#fff" >
              <Text style={styles.touchable}>Don't have an account yet? Sign Up.</Text>
            </TouchableHighlight>
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
  header: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
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
    maxWidth: 350,
  },
  touchable: {
    color: '#000',
    margin: 10,
  }
});