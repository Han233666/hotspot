import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';

import Home from './screens/Home'
import Profile from './screens/Profile'
import Login from './screens/Login'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
    };
  }

  onUpdate = (val) => {
    this.setState({
      signedIn: val
    })
  };

  render() {
    const { signedIn } = this.state;
    if(signedIn) {
      return <Tabs />;
    }
    else {
      return <Login onUpdate={this.onUpdate}/>;
    }
  }
}

const HomeScreen = ({navigation, screenProps}) => (
  <Home navigation={navigation}/>
);

const ProfileScreen = ({navigation, screenProps}) => (
  <Profile navigation={navigation}/>
);

const HomeTab = StackNavigator({
  Home: {
    screen: HomeScreen,
    headerMode: 'none',
  },
}, {
  headerMode: 'none',
});

const ProfileTab = StackNavigator({
  Profile: {
    screen: ProfileScreen,
  },
}, {
  headerMode: 'none',
});

const Tabs = TabNavigator({
  HomeTab: {
    screen: HomeTab,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({tintColor}) => ( <Icon name="home" containerStyle={{paddingBottom:3}} type="feather" size={27} color={tintColor}/>),
    },
  },
  ProfileTab: {
    screen: ProfileTab,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({tintColor}) => ( <Icon name="user" containerStyle={{paddingBottom:3}} type="feather" size={27} color={tintColor}/>),
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: '#ffc048',
    inactiveTintColor: '#fff',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#ff5e57',
      borderTopWidth: 0,
      height: (Platform.OS === 'ios') ? 48 : 52 //change tabBar height for OS
    },
    showIcon: true,
    showLabel: false,
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom', //tabBar position bottom for android/iOS
});
