import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Header,Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Hotspot Login
        </Text>
        <TextInput placeholder='Username' />
        <TextInput placeholder='Password' />
        <Button
          onPress={this.props.onLoginPress}
          title="Get Started!"
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
});
