'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadObjects } from '../stores/objects/actions';
import {
  ViroARScene,
  Viro3DObject,
  ViroNode,
  ViroAmbientLight,
} from 'react-viro';

import ObjectAR from './ObjectAR';

class ARScene extends Component {
  showObjectAR() {
    let arrObj = []
    const ARobjects = this.props.objects.ARobjects
    let showObjectAR = ARobjects.forEach((object, index) => {
      arrObj.push(<ObjectAR key={index} id={index} object={object} nav={this.props.nav} />)
    })

    return arrObj
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color="#ffffff"/>
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
