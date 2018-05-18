import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { register } from '../stores/register/action'
import { login } from '../stores/login/action'

class Register extends Component {
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
      <View>
        <Text>Register</Text>
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
          title="Register"
          onPress={ this.register }
        />
        <TouchableHighlight onPress={this.toLogin}>
          <Text
            style={styles.underlined}>
            already a user ? login here
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
  isRegistered: state.register.isRegistered,
  errorMessage: state.register.errorMessage
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  register,
  login
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (Register)