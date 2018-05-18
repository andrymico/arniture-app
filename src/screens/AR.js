import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  loadObjects,
  createObjectAR,
  removeObjectAR
} from '../store/objects/actions';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'
import { ViroARSceneNavigator } from 'react-viro';
import ARScene from '../components/ARScene';

class AR extends Component {
  constructor() {
    super()
    this.state = {
      apiKey: "43F28D4C-8082-4728-A51A-734CAD385246"
    }
  }

  simulateObject = () => {
    let dummy = {
      name: 'dummy',
      price: 999999,
      source: '/test_obj/square.obj',
      resources: '/test_obj/square.mtl'
    }
    
    this.props.createObjectAR(dummy)
    alert(this.props.objects.ARobjects.length)
  }

  render () {
    return (
      <View collapsable={false} style={{flex: 1}}>
        <Text>AR</Text>
        <Button 
          title="Add Furniture"
          onPress={this.simulateObject}
        />
        <ViroARSceneNavigator
          apiKey={ this.state.apiKey }
          initialScene={{ scene: ARScene }}
          debug={true}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  objects: state.objects
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadObjects,
  createObjectAR,
  removeObjectAR
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AR)