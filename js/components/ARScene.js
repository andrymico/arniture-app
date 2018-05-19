'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadObjects } from '../stores/objects/actions';
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

  showObjectAR() {
    let arrObj = []
    const ARobjects = this.props.objects.ARobjects
    let showObjectAR = ARobjects.forEach((object, index) => {
      arrObj.push(<ObjectAR key={index} object={object} />)
    })

    return arrObj
  }

  render() {

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color="#ffffff"/>
        <ViroDirectionalLight color="#ffffff" direction={[-.5, -1, 0]}/>
        { this.showObjectAR() }
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
