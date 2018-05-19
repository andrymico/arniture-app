import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Text,
  Button
} from 'react-native'
import { resetLoginState } from '../stores/login/action'
import { resetRegisterState } from '../stores/register/action'

class Home extends Component {
  goToAR = () => {
    this.props.navigation.navigate('AR')
  }

  logout = () => {
    this.props.resetLoginState()
    this.props.resetRegisterState()
    this.props.navigation.navigate('Login')
  }

  render () {
    return (
      <View>
        <Button
        title="logout"
        onPress= { this.logout }/>
        <Text>Home</Text>
        <Button 
          onPress={ this.goToAR }
          title="Go To AR"/>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resetLoginState,
  resetRegisterState
}, dispatch)

export default connect(null, mapDispatchToProps) (Home)
