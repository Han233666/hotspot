import React, { Component } from 'react';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';

import Home from './screens/Home'
import Profile from './screens/Profile'
import Login from './screens/Login'

import { isSignedIn } from "./Auth";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert(url));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;
    if (!checkedSignIn) {
      return null;
    }
    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}

const HomeScreen = ({navigation, screenProps}) => (
  <Home navigation={navigation}/>
);

const ProfileScreen = ({navigation, screenProps}) => (
  <Profile navigation={navigation}/>
);

const LoginScreen = ({navigation, screenProps}) => (
  <Login navigation={navigation}/>
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
    activeTintColor: '#000',
    inactiveTintColor: '#bdc3c7',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#fff',
      borderTopWidth: 0,
      height: (Platform.OS === 'ios') ? 48 : 52 //change tabBar height for OS
    },
    showIcon: true,
    showLabel: false,
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom', //tabBar position bottom for android/iOS
});

const createRootNavigator = (signedIn = false) => {
  return StackNavigator({
    SignedIn: {
      screen: Tabs,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SignedOut: {
      screen: Login,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },{
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut",
    }
  );
};
