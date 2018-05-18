import React, { Component } from 'react';
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
import { Provider } from 'react-redux'
import store from './js/stores/index'

const AuthStack = createSwitchNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  }
})

const HomeStack = createStackNavigator({
  Home: {
    screen: Home
  },
  AR: {
    screen: AR
  }
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

const RootStack = createStackNavigator({
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
