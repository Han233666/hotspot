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
      age: 'Age: 21',
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
          xlarge
          rounded
          icon={{name: 'user', type: 'entypo'}}
          //source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Text style={styles.age}>
          {this.state.age}
        </Text>
        <Button
          medium
          raised
          buttonStyle={styles.button}
          icon={{name: 'pencil', type: 'entypo'}}
          onPress={() => console.log("Works!")}
          title='Edit My Profile' />
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
    //justifyContent: 'space-between',
  },
  containerStyle1: {
    flex:1,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: "baseline",
    //justifyContent: 'space-between',
  },
  name: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: "700",
    color: '#ffffff',
    margin: 15,
  },
  age: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: "400",
    color: '#ffffff',
    margin: 15,
  },
  button: {
    backgroundColor: '#ff5e57',
    alignSelf: 'center',
    position: 'absolute',
    margin: 10,
  },
});