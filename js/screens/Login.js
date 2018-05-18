import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableHighlight } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
  login,
  resetState } from '../stores/login/action'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  toRegister = () => {
    this.props.navigation.navigate('Register')
  }

  login = async () => {
   await this.props.login(this.state.email, this.state.password)
  
   if (this.props.isLogin) {
     this.props.navigation.navigate('Home')
   }

   this.state.email = ''
   this.state.password = ''
  }

  render () {
    if (this.props.isLogin) {
      this.props.navigation.navigate('Home')
    }
    return (
      <View>
        <Text>
          {this.props.isLogin}
        </Text>
        <Text>Login</Text>
        <TextInput 
          placeholder="please input your email"
          onChangeText={
            (email) => this.setState({ email })
          }
        />
        <TextInput 
          placeholder="please input your password"
          onChangeText={
            (password) => this.setState({ password })
          }
        />
        <Text>{ this.props.errorMessage }</Text>
        <Button 
          title="Login"
          onPress={ this.login }
        />
        <TouchableHighlight
          onPress={ this.toRegister }>
          <Text
            style={ styles.underlined }>
            not a user ? register here
          </Text>
        </TouchableHighlight> 

      </View>
    )
  }
}

const styles = StyleSheet.create({
  underlined: {
    textDecorationLine: 'underline',
  }
})

const mapStateToProps = (state) => ({
  isLogin: state.login.isLogin,
  errorMessage: state.login.errorMessage,
  token: state.login.token
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
  resetState
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (Login)