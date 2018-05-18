import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import {
  createSwitchNavigator,
  createStackNavigator } from 'react-navigation'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import Home from './src/screens/Home'
import AR from './src/screens/AR'


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
  initialRouteName: 'HomeStack',
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
    );
  }
}