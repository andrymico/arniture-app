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
  ScrollView,
  Image,
  TouchableHighlight,
  CameraRoll,
  Alert
} from 'react-native'
import { ViroARSceneNavigator } from 'react-viro';
import ARScene from '../components/ARScene';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import ItemCard from '../components/ItemCard';
import { captureScreen } from "react-native-view-shot";

export class AR extends Component {
  constructor() {
    super()
    this.state = {
      apiKey: "43F28D4C-8082-4728-A51A-734CAD385246",
      empty: ''
    }
  }

  toHome() {
    this.props.navigation.navigate('Home')
  }

  toCart() {
    this.props.navigation.navigate('Cart')
  }

  renderList() {
    const data = this.props.items.data
    let objectList = []
    data.forEach(d => {
      objectList.push(<ItemCard item={d} key={d._id} />)
    })
    return objectList
  }

  captureScreenFunction = () => {
    captureScreen({
      format: "jpg",
      quality: 0.8
    })
    .then(
      uri => CameraRoll.saveToCameraRoll(uri),
      error => console.error("Oops, Something Went Wrong", error)
    );
    Alert.alert('Screenshot saved to camera roll')
  }

  render () {
    return (
      <View collapsable={false} style={styles.container}>
        <Button
          onPress={ () => this.captureScreenFunction() }>Screenshot</Button>
        <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal6"} swipeArea={20}>
          <ScrollView horizontal={true}>
            {/* {this.renderList()} */}
          </ScrollView>
        </Modal>

        {/* <ViroARSceneNavigator
          style={ styles.arView }
          apiKey={ this.state.apiKey }
          initialScene={{ scene: ARScene }}
          debug={true}
        /> */}

        <View style={{position: 'absolute', left: 10, top: 0}}>
          <TouchableHighlight style={styles.buttons}
            onPress={() => this.toHome()}
            underlayColor={'#00000000'} >
            <Image source={require('../assets/button-back.png')} />
          </TouchableHighlight>
        </View>

        <View style={{position: 'absolute', right: 70, top: 0}}>
          <TouchableHighlight style={styles.buttons}
            onPress={() => this.props.reset()}
            underlayColor={'#00000000'} >
            <Image source={require('../assets/button-reset.png')} />
          </TouchableHighlight>
        </View>

        <View style={{position: 'absolute', right: 0, top: 0}}>
          <TouchableHighlight style={styles.buttons}
            onPress={() => this.toCart()}
            underlayColor={'#00000000'} >
            <Image source={require('../assets/button-cart.png')} />
          </TouchableHighlight>
        </View>

        <View style={{position: 'absolute',  left: 0, right: 0, bottom: 10, alignItems: 'center'}}>
          <TouchableHighlight style={styles.buttons}
            onPress={() => this.refs.modal6.open()}
            underlayColor={'#00000000'} >
            <Image source={require('../assets/button-add.png')} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  arView: {
    flex: 1
  },

  cartNotif: {
    position: 'absolute', 
    paddingHorizontal: 5, 
    backgroundColor: 'red', 
    opacity: 0.75, 
    borderColor: 'red', 
    borderRadius: 10, 
    overflow: 'hidden',
    borderWidth: 1,
    right: 10, 
    top: 20, 
    fontSize: 20, 
    color: '#fff'
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal4: {
    height: 250
  },

  buttons : {
    height: 80,
    width: 80,
    paddingTop:5,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  }
});

const mapStateToProps = (state) => ({
  objects: state.objects,
  items: state.items,
  cart: state.cart
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