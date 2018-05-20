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
  TouchableHighlight
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
      <View collapsable={false} style={styles.container}>
        <Button 
          onPress={() => this.toHome()}>Back</Button>                
          
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
        />
        
        <View style={{position: 'absolute',  left: 0, right: 0, bottom: 80, alignItems: 'center'}}>
          <TouchableHighlight style={styles.buttons}
            onPress={() => this.refs.modal6.open()}
            underlayColor={'#00000000'} >
            <Image source={require('../assets/btn_mode_objects.png')} />
          </TouchableHighlight>
        </View>

        {/* <Button
          onPress={() => this.props.reset() }>Reset</Button>
        <Button
          style={styles.btn}
          onPress={() => this.refs.modal6.open()}>Add Item</Button> */}
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
    paddingTop:20,
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