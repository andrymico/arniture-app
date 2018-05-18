'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import { showDialog } from '../stores/objects/actions'
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Alert } from 'react-native'
import {
  Viro3DObject,
  ViroNode,
  ViroQuad,
  ViroSpotLight,
  ViroButton
} from 'react-viro';

class ObjectAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      rotation: [0, 45, 0],
      clickFlag: 0
    };
  }

  _onRotate = (rotateState, rotationFactor, source) => {
    if (rotateState == 3) {
      this.setState({
        rotation : [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]
      })
      return;
    }

    this.arNodeRef.setNativeProps({rotation:[this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]});
  }

  _setARNodeRef = (component) => {
    this.arNodeRef = component;
  }
  
  _onClick = () => {
    this.setState({
      clickFlag: this.state.clickFlag + 1
    })
    if (this.state.clickFlag === 2) {
      Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      this.setState({
        clickFlag: 0
      })
    }
  }

  _onPinch = (state, source) => {
    if (state == 3) {
    
    }
  }
  render() {
    return (
      <ViroNode>
        <ViroSpotLight 
          innerAngle={5}
          outerAngle={20}
          direction={[0,-1,0]}
          position={[0, 4, 0]}
          color="#ffffff"
          castsShadow={true}
          shadowNearZ={.1}
          shadowFarZ={6}
          shadowOpacity={.9}
          ref={this._setSpotLightRef} />

          <Viro3DObject
            source={require('../assets/test_obj/square.obj')}
            onClick={this._onClick}
            resources={[require('../assets/test_obj/square.mtl')]}
            ref={this._setARNodeRef}
            rotation={this.state.rotation}
            onRotate={this._onRotate}
            onDrag={() => {
              this.setState({
                clickFlag: 0
              })
            }}
            onPinch= { this._onPinch }
            dragType="FixedToWorld"
            position={[0, -1, -1]}
            scale={[0.2, 0.2, 0.1]}
            type="OBJ"
          />

        <ViroQuad
          rotation={[-90, 0, 0]}
          position={[0, -.001, 0]}
          width={2.5} height={2.5}
          arShadowReceiver={true}
          ignoreEventHandling={true} />
      </ViroNode>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  showDialog
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(ObjectAR);
