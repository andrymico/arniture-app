import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
import ARScene from './ARScene'
import {addToCart} from '../stores/cart/action';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createObjectAR } from '../stores/objects/actions';

class ItemCard extends Component {

  toAR = () => {

    this.props.nav.navigate('AR')
  }

  render() {
    let thumbnail = `../assets/${this.props.item.img}`
    return (
      <View style={style.card}>
        <View style={{flex: 2, marginVertical: 10}}>
          <Image 
            source={{uri: this.props.item.img}}
            style={style.thumbnail} />
        </View>
        <View style={{flex:3, marginLeft: 10}}>
          <Text style={style.title}>{this.props.item.name}</Text>
          <Text style={style.description}>{this.props.item.name}</Text>
          <Text style={style.price}>{this.props.item.price}</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Button style={style.btn1} onPress={() => this.toAR()}>Simulate AR</Button>
            <Button style={style.btn2} onPress={() => this.props.addToCart(this.props.item._id, this.props.token, this.props.item.price)}>Add to Cart</Button>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 4,
    marginHorizontal: 4,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  thumbnail: {
    width: 116,
    height: 116,
    alignSelf: 'center',
    paddingTop: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '600'
  },
  description: {
    fontSize: 16,
    fontWeight: '100',
    fontStyle: 'italic'
  },
  price: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '600'
  },
  btn1: {
    marginTop: 10,
    backgroundColor: "#d32f2f",
    color: "white",
    padding: 5,
    width: '95%'
  },
  btn2: {
    marginTop: 10,
    backgroundColor: "#d32f2f",
    color: "white",
    padding: 5,
    width: '75%'
  },
})

const mapStateToProps = (state) => ({
  items: state.items,
  token: state.login.token
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addToCart
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (ItemCard)