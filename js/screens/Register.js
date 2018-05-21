import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight } from 'react-native'
import Button from 'react-native-button';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { register } from '../stores/register/action'
import { login } from '../stores/login/action'

export class Register extends Component {
  constructor (props) {
    super (props)
    this.state = {
      email: '',
      password: ''
    }
  }

  toLogin = () => {
    this.props.navigation.navigate('Login')
  }

  register = () => {
    this.props.register(this.state.email, this.state.password)
    if (this.props.isRegistered === true) {
      this.props.login(this.state.email, this.state.password)
      this.props.navigation.navigate('Home')
      this.state.email = ''
      this.state.password = ''
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Register</Text>
        <TextInput 
          style={styles.inputText}
          placeholder="please input your email"
          onChangeText={
            (email) => this.setState({ email })
          } />
        <TextInput 
          style={styles.inputText}
          placeholder="please input your password"
          secureTextEntry={ true }
          onChangeText={
            (password) => this.setState({ password })
          } />
        <Text>{ this.props.errorMessage }</Text>
        <Button
          onPress={ this.register }
          style={styles.btn}>
          Register
        </Button>
        <TouchableHighlight
          onPress={this.toLogin}>
          <Text
            style={styles.underlined}>
            Already a user ? Login here
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
  header: {
    fontWeight: 'bold',
    color: '#d32f2f',
    fontSize: 32
  },
  inputText: {
    backgroundColor: '#fff',
    width: 250,
    margin: 12
  },
  underlined: {
    textDecorationLine: 'underline',
    margin: 10
  },
  btn: {
    margin: 10,
    backgroundColor: "#d32f2f",
    color: "white",
    padding: 10
  }
})

const mapStateToProps = (state) => ({
  isRegistered: state.register.isRegistered,
  errorMessage: state.register.errorMessage
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  register,
  login
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (Register)