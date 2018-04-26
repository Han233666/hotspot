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
  TouchableHighlight,
  Image,
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
      disabledSignUp: true,
      loadingSignUp: false,
      disabledSignIn: true,
      loadingSignIn: false,
    };
  }

  showSignUp(visible) {
    this.setState({signUp: visible});
  }

  signIn() {
    this.setState({loadingSignIn: true});
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
          AsyncStorage.setItem("signedIn",'true');
          this.props.navigation.dispatch(this.props.navigation.dispatch(NavigationActions.reset({ index: 0, key: null, actions: [NavigationActions.navigate({ routeName: 'SignedIn' })], })));
        }
        else {
          Alert.alert(responseJson.info.message);
        }
      })
      this.setState({loadingSignUp: false});
    }
    catch (error) {
      Alert.alert(error);
      this.setState({loadingSignUp: false});
    }
  }

  signUpValid() {
    if(this.state.firstName.trim()== "" || this.state.lastName.trim()== "" || this.state.username.trim()== "" || this.state.password.trim() == "") {
      this.setState({disabledSignUp: true});
    }
    else {
      this.setState({disabledSignUp: false});
    }
  }

  signInValid() {
    if(this.state.username.trim()== "" || this.state.password.trim() == "") {
      this.setState({disabledSignIn: true});
    }
    else {
      this.setState({disabledSignIn: false});
    }
  }

  signUp() {  
    this.setState({loadingSignUp: true});
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
          this.signIn();
        }
        else {
          Alert.alert(responseJson.info.message);
        }
      })
      this.setState({loadingSignUp: false});
    }
    catch (error) {
      Alert.alert(error);
      this.setState({loadingSignUp: false});
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
              onChangeText={(firstName) => {this.setState({firstName});this.signUpValid()}}
            />
            <FormLabel labelStyle={{color:"#000"}}>LAST NAME</FormLabel>
            <FormInput 
              inputStyle={{color:"#000"}} 
              containerStyle={styles.input} 
              returnKeyType = {"next"} 
              onSubmitEditing={(event) => {this.userinput.focus()}} 
              value={this.state.lastName} 
              ref={input => this.lastnameinput = input} 
              onChangeText={(lastName) => {this.setState({lastName});this.signUpValid()}}
            />
            <FormLabel labelStyle={{color:"#000"}}>USERNAME</FormLabel>
            <FormInput 
              inputStyle={{color:"#000"}} 
              containerStyle={styles.input} 
              returnKeyType = {"next"} 
              onSubmitEditing={(event) => {this.passwordinput.focus()}} 
              value={this.state.username} 
              ref={input => this.userinput = input} 
              onChangeText={(username) => {this.setState({username});this.signUpValid()}} autoCapitalize="none" 
            />
            <FormLabel labelStyle={{color:"#000"}}>PASSWORD</FormLabel>
            <FormInput 
              inputStyle={{color:"#000"}} 
              containerStyle={styles.input} 
              returnKeyType = {"go"} 
              onSubmitEditing={(event) => {this.state.disabledSignUp ? '':this.signUp()}} 
              value={this.state.password} 
              ref={input => this.passwordinput = input} 
              onChangeText={(password) => {this.setState({password});this.signUpValid()}} secureTextEntry
            />
            <Button
            title={this.state.loadingSignUp ? "":"SIGN UP"}
            loading={this.state.loadingSignUp} 
            disabled={this.state.disabledSignUp} 
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
          <Image style={styles.image} source={require('../../assets/images/hotspot.png')}/>
            <FormLabel labelStyle={{color:"#000"}}>USERNAME</FormLabel>
            <FormInput 
              inputStyle={{color:"#000"}} 
              containerStyle={styles.input} 
              returnKeyType = {"next"} 
              onSubmitEditing={(event) => {this.passwordinput.focus()}} 
              value={this.state.username} 
              ref={input => this.userinput = input} 
              onChangeText={(username) => {this.setState({username});this.signInValid()}} autoCapitalize="none" 
            />
            <FormLabel labelStyle={{color:"#000"}}>PASSWORD</FormLabel>
            <FormInput 
              inputStyle={{color:"#000"}} 
              containerStyle={styles.input} 
              returnKeyType = {"go"} 
              onSubmitEditing={(event) => {this.state.disabledSignIn ? '':this.signIn()}} 
              value={this.state.password} 
              ref={input => this.passwordinput = input} 
              onChangeText={(password) => {this.setState({password});this.signInValid()}} secureTextEntry
            />
        <Button
          title={this.state.loadingSignIn ? "":"SIGN IN"}
          loading={this.state.loadingSignIn} 
          disabled={this.state.disabledSignIn} 
          onPress={() => this.signIn()}
          textStyle={{ fontWeight: "700" }}
          buttonStyle={styles.button}
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
    marginBottom: 5,
    fontWeight: "900",
  },
  form: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    margin: 10,
    width: 70,
    height: 98,
  },
  input: {
    maxWidth: 350,
  },
  touchable: {
    color: '#000',
    margin: 10,
  }
});