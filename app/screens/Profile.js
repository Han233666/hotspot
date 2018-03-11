import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Header,Button,Avatar } from 'react-native-elements';
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
      <View style={styles.outerContainer}>
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
        <Avatar 
          large
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Text style={styles.email}>
          {this.state.email}
        </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#ffdd59',
  },
  container: {
    flex: 1,
    alignItems: 'center',
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