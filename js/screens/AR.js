import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  loadObjects,
  createObjectAR,
  removeObjectAR,
  reset
} from '../stores/objects/actions';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
import { ViroARSceneNavigator } from 'react-viro';
import ARScene from '../components/ARScene';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import ItemCard from '../components/ItemCard';
import { captureScreen } from 'react-native-view-shot'

class AR extends Component {
  constructor() {
    super()
    this.state = {
      apiKey: "43F28D4C-8082-4728-A51A-734CAD385246"
    }
  }

  simulateObject = () => {
    this.props.createObjectAR(dummy)
  }

  toHome () {
    this.props.navigation.navigate('Home')
  }

  renderList() {
    const data = this.props.items.data
    let objectList = []
    data.forEach(d => {
      objectList.push(<ItemCard item={d} key={d._id} />)
    })
    return objectList
  }

  doSnapShot = () => {
    captureScreen({
      format: "jpg",
      quality: 0.8
    })
    .then(
      uri => console.log("Image saved to", uri),
      error => console.error("Oops, snapshot failed", error)
    )
  }

  render () {
    return (
      <View collapsable={false} style={{flex: 1}}>
      <Button onPress = {() => this.toHome()}>Back</Button>                
      <Button onPress={() => this.refs.modal6.open()} style={styles.btn}>Add Item</Button>
      <Button onPress={() => this.props.reset() }>Reset</Button>  
      <Button onPress={() => this.doSnapShot() }>Screenshot</Button>
        <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal6"} swipeArea={20}>
          <ScrollView horizontal={true}>
            {this.renderList()}
          </ScrollView>
        </Modal>
        <ViroARSceneNavigator
          apiKey={ this.state.apiKey }
          initialScene={{ scene: ARScene }}
          debug={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({  
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal4: {
    height: 250
  },

  text: {
    color: "black",
    fontSize: 22
  }
});

const mapStateToProps = (state) => ({
  objects: state.objects,
  items: state.items
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadObjects,
  createObjectAR,
  removeObjectAR,
  reset
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AR)