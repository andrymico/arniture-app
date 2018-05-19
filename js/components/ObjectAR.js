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
    alert(ARObjectList)
    ARObjectList.splice(this.props.index, 1)
    alert(ARObjectList, 'setelah dihapus')
    this.props.removeObjectAR(ARObjectList)
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
          {text: 'Add to Cart', onPress: () => console.log('Ask me later pressed')},
          {text: 'Delete', onPress: () => this.deleteThis()},
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
            source={require('../assets/wooden-chair/chair1.obj')}
            resources={[require('../assets/wooden-chair/chair1.mtl'),
                        require('../assets/wooden-chair/wood.jpg')]}
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
  objects : state.objects
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  showDialog,
  removeObjectAR
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectAR);
