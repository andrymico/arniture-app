import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
  increaseQuantity,
  decreaseQuantity,
  getCart,
  updateCart,
  deleteCart } from '../stores/cart/action'
import Cart from '../screens/Cart'

class CartItem extends Component {
  increase = () => {
    this.props.increaseQuantity(this.props.object._id)
    let cartData = [...this.props.cart]
    cartData.forEach(data => {
      if (data._id === this.props.object._id) {
        let individualPrice = data.totalPrice / data.quantity
        data.quantity = data.quantity + 1
        data.totalPrice = data.totalPrice + individualPrice
      }
    })
    this.props.updateCart(cartData)
  }

  decrease = () => {
    let cartData = [...this.props.cart]
    cartData.forEach(data => {
      if (data._id === this.props.object._id && data.quantity !== 1 ) {
        let individualPrice = data.totalPrice / data.quantity
        data.quantity = data.quantity - 1
        data.totalPrice = data.totalPrice - individualPrice
        this.props.updateCart(cartData)
        this.props.decreaseQuantity(this.props.object._id)
      }
    })
  }
  
  delete = () => {
    this.props.deleteCart(this.props.object._id)
    let cartData = [...this.props.cart]
    cartData.splice(this.props.idx, 1)
    this.props.updateCart(cartData)
  }
  
  render() {
    return (
      <View style={style.card}>
        <Button style={style.btn1} onPress={() => this.delete()}>X</Button>
        <Image 
          source={{uri: `https://storage.googleapis.com/arniture/${this.props.object.itemId.img}`}}
          style={style.thumbnail} />
        <Text style={style.title}>{this.props.object.itemId.name}</Text>
        <Text style={style.description}>{this.props.object.itemId.description}</Text>
        <Text style={style.price}>Quantity {this.props.object.quantity}</Text>
        <Text style={style.price}>{this.props.object.totalPrice}</Text>
        <Button onPress={() => this.increase()}>+</Button>
        <Button onPress={() => this.decrease()}>-</Button>
      </View>
    );
  }
}
const style = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10
  },
  thumbnail: {
    width: 64,
    height: 64,
    alignSelf: 'center',
    paddingTop: 16
  },
  title: {
    flex: 1,
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
    backgroundColor: "#d32f2f",
    color: "white",
    padding: 5,
    width: '95%'
  },
})
const mapStateToProps = (state) => ({
  cart: state.cart.data
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  increaseQuantity,
  decreaseQuantity,
  getCart,
  updateCart,
  deleteCart
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps) (CartItem)