import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import {
  ViroARScene,
  Viro3DObject,
  ViroNode,
  ViroAmbientLight,
} from 'react-viro';

import ObjectAR from './ObjectAR';

export class ARScene extends Component {
  showObjectAR() {
    let arrObj = []
    const ARobjects = this.props.objects.ARobjects
    let showObjectAR = ARobjects.forEach((object, index) => {
      arrObj.push(<ObjectAR key={index} id={index} object={object} />)
    })

    return arrObj
  }

  render() {
    return (
      <View>
      </View>
      // <ViroARScene onTrackingUpdated={this._onInitialized} >
      //   <ViroAmbientLight color="#ffffff"/>
      //   { this.showObjectAR() }
      // </ViroARScene>
    );
  }
}

const mapStateToProps = (state) => ({
  objects: state.objects
})

export default connect(
  mapStateToProps,
  null
)(ARScene);
