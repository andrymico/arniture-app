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

import { removeObjectAR } from '../stores/objects/actions'
import {
  chair_obj,
  chair_mtl,
  couch_obj,
  couch_mtl,
  redcarpet_obj,
  redcarpet_mtl
} from '../assets/AssetDirectory'

import { addToCart } from '../stores/cart/action'

import { captureScreen } from 'react-native-view-shot'

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

  deleteThis = () => {
    let ARObjectList = this.props.objects.ARobjects
    let newBucket = []
    ARObjectList.forEach(obj => {
      if (obj._id !== this.props.object._id) {
        newBucket.push(obj)
      }
    })
    this.props.removeObjectAR(newBucket)
  }
  
  _onClick = () => {
    this.setState({
      clickFlag: this.state.clickFlag + 1
    })
    if (this.state.clickFlag === 1) {
      Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
          {text: 'Add to Cart', onPress: () => this.props.addToCart(this.props.object._id, this.props.token, this.props.object.price)},
          {text: 'Delete', onPress: () => this.deleteThis()},
        ],
        { cancelable: false }
      )
      this.setState({
        clickFlag: 0
      })
    }
  }

  doSnapShot = () => {
    captureScreen({
      format: "jpg",
      quality: 0.8
    })
    .then(
      uri => console.log("Image saved to", uri),
      error => console.error("Oops, snapshot failed", error)
    );
  }

  _onPinch = (state, source) => {
    if (state == 3) {
    
    }
  }
  render() {
    let obj = ''
    let mtl = ''
      if(this.props.object.name === 'Wooden Chair') {
        obj = chair_obj
        mtl = chair_mtl
      } else if (this.props.object.name === 'Red Carpet') {
        obj = redcarpet_obj,
        mtl = redcarpet_mtl
      } else {
        obj = couch_obj,
        mtl = couch_mtl
      }


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
            source={obj}
            resources={mtl}
            onClick={this._onClick}
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
            scale={[.2, .2, .2]}
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

const mapStateToProps = (state) => ({
  objects : state.objects,
  token: state.login.token
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  showDialog,
  removeObjectAR,
  addToCart
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectAR);
