import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Header,Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first:'firstname',
      last:'lastname',
      email:'email@email.com',
    };
  }

  render() {
    return (
      <View style={styles.container}>
      <Header
          leftComponent={{ }}
          centerComponent={{ text: 'Profile', style: { color: '#fff', fontSize: 20 } }}
          outerContainerStyles={{ backgroundColor: '#ff5e57', borderBottomWidth:0 }}
          rightComponent={{  }}
        />
        <View style={styles.container}>
        <Text style={styles.name}>
          {this.state.first} {this.state.last}
        </Text>
        <Text style={styles.email}>
          {this.state.email}
        </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffdd59',
  },
  name: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: "700",
    color: '#ffffff',
    margin: 10,
  },
  email: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: "400",
    color: '#ffffff',
    margin: 10,
  },
});