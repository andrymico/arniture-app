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
import { addToCart } from '../stores/cart/action'

class AR extends Component {
  constructor() {
    super()
    this.state = {
      apiKey: "43F28D4C-8082-4728-A51A-734CAD385246"
    }
  }
  componentDidMount () {

  }

  simulateObject = () => {
    this.props.createObjectAR(dummy)
  }

  toHome() {
    this.props.navigation.navigate('Home')
    this.deleteAll()
  }

  toCart() {
    this.props.navigation.navigate('Cart')
    this.deleteAll()
  }

  deleteAll = () => {
    let newBucket = [...this.props.objects.ARobjects]
    newBucket.splice(0, newBucket.length)
    this.props.removeObjectAR(newBucket)
  }

  renderList() {
    const data = this.props.items.data
    let objectList = []
    data.forEach(d => {
      objectList.push(<ItemCard item={d} key={d._id} />)
    })
    return objectList
  }

  buyAll = async () => {
    const tempObject = this.props.objects.ARobjects
    await tempObject.forEach(obj => {
      this.props.addToCart(obj._id, this.props.token, obj.price)
    })
    this.deleteAll()
    alert("Added all item to Cart")
    this.props.navigation.navigate('Cart')
  }


  captureScreenFunction=()=>{
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
        <Modal style={[styles.modal, styles.modal3]} position={"center"} swipeToClose={true} isOpen={true}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Welcome to ARniture</Text>
          <Text style={styles.li}>To get started, you can push the "+" button on the bottom of your screen to simulate the AR furniture</Text>
          <Text style={styles.li}>You can double tap the 3D object to access option dialogue for Add to Cart/Remove the 3D object</Text>
          <Text style={styles.li}>Item that added to the cart can be checked on the Cart menu on the top-right of your screen</Text>
        </Modal>

        <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal6"} swipeArea={20}>
          <ScrollView horizontal={true}>
            {this.renderList()}
          </ScrollView>
        </Modal>

        <ViroARSceneNavigator
          style={ styles.arView }
          apiKey={ this.state.apiKey }
          initialScene={{ scene: ARScene }}
          debug={true}
          nav={this.props.navigation}
        />

        {/* BUTTON SHOULD BE UNDER ViroARSceneNavigator */}

        <View style={{position: 'absolute', left: 10, top: 0}}>
          <TouchableHighlight style={styles.buttons}
            onPress={() => this.toHome()}
            underlayColor={'#00000000'} >
            <Image source={require('../assets/button-back.png')} />
          </TouchableHighlight>
        </View>

        <View style={{position: 'absolute', right: 150, top: 0}}>
          <TouchableHighlight style={styles.buttons}
            onPress={() => this.captureScreenFunction()}
            underlayColor={'#00000000'} >
            <Image source={require('../assets/button-screenshot.png')} />
          </TouchableHighlight>
        </View>

        <View style={{position: 'absolute', right: 80, top: 0}}>
          <TouchableHighlight style={styles.buttons}
            onPress={() => this.deleteAll()}
            underlayColor={'#00000000'} >
            <Image source={require('../assets/button-reset.png')} />
          </TouchableHighlight>
        </View>

        <View style={{position: 'absolute', right: 10, top: 0}}>
          <TouchableHighlight style={styles.buttons}
            onPress={() => this.toCart()}
            underlayColor={'#00000000'} >
            <Image source={require('../assets/button-cart.png')} />
          </TouchableHighlight>
        </View>

        <View style={{position: 'absolute', left: 10, bottom: 10, alignItems: 'flex-start'}}>
          <TouchableHighlight style={styles.buttons}
            onPress={() => this.buyAll()}
            underlayColor={'#00000000'} >
            <Image source={require('../assets/button-cart.png')} />
          </TouchableHighlight>
        </View>

        <View style={{position: 'absolute', right: 10, bottom: 10, alignItems: 'flex-end'}}>
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

  modal3: {
    height: 300,
    width: 300
  },

  modal4: {
    height: 250
  },

  li: {
    fontSize: 18, 
    paddingHorizontal: 10, 
    paddingTop: 15, 
    fontWeight: '600'
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
  cart: state.cart,
  token: state.login.token
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadObjects,
  createObjectAR,
  removeObjectAR,
  reset,
  addToCart
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AR)