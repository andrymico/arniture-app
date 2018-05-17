'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  Viro3DObject,
  ViroBox,
  ViroARPlane,
  ViroNode,
  ViroAmbientLight,
  ViroDirectionalLight
} from 'react-viro';

export default class ObjectAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      rotation: [0, 0, 0]
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "ARniture"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
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

  render() {
    return (
      <Viro3DObject
        source={require('../assets/test_obj/square.obj')}
        resources={[require('../assets/test_obj/square.mtl')]}
        ref={this._setARNodeRef}
        rotation={this.state.rotation}
        onRotate={this._onRotate}
        onDrag={() => {}}
        dragType="FixedToWorld"
        position={[0, -1, -3]}
        scale={[0.2, 0.2, 0.1]}
        type="OBJ"
      />
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

module.exports = ObjectAR;
