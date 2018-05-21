'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, StyleSheet } from 'react-native'
import {
  Viro3DObject,
  ViroNode,
  ViroButton,
  ViroText,
  ViroQuad,
  ViroSpotLight
} from 'react-viro';
import { removeObjectAR, showDialog} from '../stores/objects/actions'
import { addToCart, getCart } from '../stores/cart/action'
import ViewShot, { captureScreen } from 'react-native-view-shot'

class ObjectAR extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR...",
      rotation: [0, 45, 0],
      position: [0, -1, -1],
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
    let newBucket = [...this.props.objects.ARobjects]
    let dummy = {
      item_obj: '',
      item_mtl: ['', ''],
      scale: [.001, .001, .001]
    }

    newBucket.splice(this.props.id, 1, dummy)
    this.props.removeObjectAR(newBucket)
  }

  addToCart = () => {
    this.props.addToCart(this.props.object._id, this.props.token, this.props.object.price)
    alert("Added new item to cart")
  }
  
  _onClick = () => {
    this.setState({
      clickFlag: this.state.clickFlag + 1
    })
    if (this.state.clickFlag === 1) {
      Alert.alert(
        `${this.props.object.name}`,
        'What are you gonna do?',
        [
          {text: 'Add to Cart', onPress: () => this.addToCart() },
          {text: 'Delete', onPress: () => this.deleteThis()},
          {text: 'Cancel', onPress: () => {}, style: 'cancel'}
        ],
        { 
          cancelable: true
        }
      )
      this.setState({
        clickFlag: 0
      })
    }
  }

  _onDrag = () => {
    this.setState({
      clickFlag: 0
    })
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

  render() {
    return (
      <ViroNode>
        <ViroSpotLight
          innerAngle={5}
          outerAngle={25}
          direction={[0, -1, -.2]}
          position={[0, 3, 0]}
          color="#ffffff"
          castsShadow={true}
          shadowMapSize={2048}
          shadowNearZ={2}
          shadowFarZ={5}
          shadowOpacity={.7} />

        <Viro3DObject
          source={{uri: `https://storage.googleapis.com/arniture/${this.props.object.item_obj}`}}
          resources={[{uri: `https://storage.googleapis.com/arniture/${this.props.object.item_mtl[0]}`},
                      {uri: `https://storage.googleapis.com/arniture/${this.props.object.item_mtl[1]}`}]}
          onClick={this._onClick}
          ref={this._setARNodeRef}
          rotation={this.state.rotation}
          onRotate={this._onRotate}
          onDrag={this._onDrag}
          dragType="FixedToWorld"
          position={[0, -1, -1]}
          scale={this.props.object.scale}
          type="OBJ" />

        {/* <ViroQuad
          position={[0, 0, -1]}
          rotation={[-90, 0, 0]}
          width={20} height={20}
          arShadowReceiver={true} /> */}
      </ViroNode>
    );
  }
}

const mapStateToProps = (state) => ({
  objects : state.objects,
  token: state.login.token
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  showDialog,
  removeObjectAR,
  addToCart,
  getCart
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectAR);
