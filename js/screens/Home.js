import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'
import { resetLoginState } from '../stores/login/action'
import { resetRegisterState } from '../stores/register/action'
import Catalogue from '../components/Catalogue';

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
      
      <Catalogue nav={this.props.navigation}/>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#d32f2f'
  },
  header: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 36,
    alignSelf: 'center'
  }
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resetLoginState,
  resetRegisterState
}, dispatch)

export default connect(null, mapDispatchToProps) (Home)
