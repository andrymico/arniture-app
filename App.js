import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './js/stores/index'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  createSwitchNavigator,
  createStackNavigator } from 'react-navigation'
import Login from './js/screens/Login'
import Register from './js/screens/Register'
import Home from './js/screens/Home'
import AR from './js/screens/AR'
import Cart from './js/screens/Cart'
import Checkout from './js/screens/Checkout';

const AuthStack = createSwitchNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  }
})

const HomeStack = createSwitchNavigator({
  Home: {
    screen: Home
  },
  AR: {
    screen: AR
  },
  Cart: {
    screen: Cart
  },
  Checkout: {
    screen: Checkout
  }
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

const RootStack = createSwitchNavigator({
  AuthStack: {
    screen: AuthStack
  },
  HomeStack: {
    screen: HomeStack
  }
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
