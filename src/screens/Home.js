import React, { Component } from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'

class Home extends Component {
  goToAR = () => {
    this.props.navigation.navigate('AR')
  }

  render () {
    return (
      <View>
        <Text>Home</Text>
        <Button 
          onPress={ this.goToAR }
          title="Go To AR"/>
      </View>
    )
  }
}

export default Home