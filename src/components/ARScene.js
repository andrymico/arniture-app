'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadObjects } from '../store/objects/actions';
import {
  StyleSheet,
  View,
  Button
} from 'react-native';

import {
  ViroARScene,
  Viro3DObject,
  ViroNode,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroSpotLight,
  ViroQuad
} from 'react-viro';

import ObjectAR from './ObjectAR';

class ARScene extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR...",
      rotation: [0, 0, 0]
    };
  }

  componentDidMount() {
    this.props.loadObjects()
  }

  _setSpotLightRef = (component) => {
    this.spotLight = component;
  }

  render() {
    const ARobjects = this.props.objects.ARobjects
    let showObjectAR = ARobjects.map((object, index) => 
      <ObjectAR />
    )

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color="#ffffff"/>
        <ViroDirectionalLight color="#ffffff" direction={[-.5, -1, 0]}/>
        { showObjectAR }
      </ViroARScene>
    );
  }
}

const mapStateToProps = (state) => ({
  objects: state.objects
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadObjects
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ARScene);
