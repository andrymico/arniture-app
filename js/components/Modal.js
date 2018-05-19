import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import Slider from 'react-native-slider';
import ItemCard from '../components/ItemCard';

var screen = Dimensions.get('window')

class TestModal extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      isHorizontal: true,
      sliderValue: 0.3
    }
  }

  onOpen() {
    console.log('Modal just openned');
  }

  renderList() {
    let objectList = []

    for (let i=1; i<=7; i++) {
      objectList.push(<ItemCard style={{width: '75%'}} key={`card-${i}`} object={`Title ${i}`} />)
    }

    return objectList
  }

  render() {
    var BContent = <Button onPress={() => this.setState({isOpen: false})} style={[styles.btn, styles.btnModal]}>X</Button>;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button onPress={() => this.refs.modal6.open()} style={styles.btn}>Position bottom + ScrollView</Button>

        <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal6"} swipeArea={20}>
          <ScrollView horizontal={true}>
            {this.renderList()}
          </ScrollView>
        </Modal>
      </View>
    );
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
    position: "absolute",
    top: 0,
    right: 0,
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

export default TestModal;