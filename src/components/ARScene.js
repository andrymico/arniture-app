'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button
} from 'react-native';

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

import ObjectAR from './ObjectAR';

export default class ARScene extends Component {

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
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color="#00ffff"/>
        <ViroDirectionalLight color="#ffffff" direction={[-.5, -1, 0]}/>
        <ObjectAR/>
      </ViroARScene>
    );
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

module.exports = ARScene;
