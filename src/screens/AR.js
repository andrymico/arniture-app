import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'
import {
  ViroARSceneNavigator
} from 'react-viro';

// import ARScene from '../components/ARScenes';
import ARScene from '../components/ARScene';

class AR extends Component {
  constructor() {
    super()
    this.state = {
      apiKey: "43F28D4C-8082-4728-A51A-734CAD385246"
    }
  }

  render () {
    return (
      <View collapsable={false} style={{flex: 1}}>
        <Text>AR</Text>
        <Button 
          title="Add Furniture"
          onPress={() => alert('Add!')}
        />
        <ViroARSceneNavigator
          apiKey={ this.state.apiKey }
          initialScene={{ scene: ARScene }}
        />
      </View>
    )
  }
}

export default AR