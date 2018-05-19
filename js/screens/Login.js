import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight } from 'react-native'
import Button from 'react-native-button';
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
      <View style={styles.container}>
        <Text>
          {this.props.isLogin}
        </Text>
        <Text style={{fontWeight: 'bold', color: '#d32f2f', fontSize: 32}}>Login</Text>
        <TextInput
          style={{backgroundColor: '#fff', width: 250, margin: 12}}
          placeholder="please input your email"
          onChangeText={(email) => this.setState({ email })} />
        <TextInput
          style={{backgroundColor: '#fff', width: 250, margin: 12}}
          placeholder="please input your password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })} />
        <Text>{ this.props.errorMessage }</Text>
        <Button
          onPress={ this.login }
          style={{margin: 10, backgroundColor: "#d32f2f", color: "white",padding: 10}}>
          Login
        </Button>
        <TouchableHighlight
          onPress={ this.toRegister }>
          <Text style={ styles.underlined }>
            Not a user ? Register here
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  underlined: {
    textDecorationLine: 'underline',
    margin: 10
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