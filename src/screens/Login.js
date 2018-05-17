import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  Button } from 'react-native'

class Login extends Component {
  toRegister = () => {
    this.props.navigation.navigate('Register')
  }

  render () {
    return (
      <View>
        <Text>Login</Text>
        <TextInput 
        placeholder="please input your email"/>
        <TextInput 
        placeholder="please input your password"/>
        <Button
          title="not a user ? register here"
          onPress={this.toRegister}
        />
      </View>
    )
  }
}

export default Login