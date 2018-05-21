import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert
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

  toRp(price) {
    return price.toLocaleString()
  }

  deleteConfirm = () => {
    Alert.alert(
      'Remove from cart',
      'Are you sure want to remove this item?',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'Confrim', onPress: () => this.delete()},
      ],
      { cancelable: false }
    )
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
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 5}}>
            <Text style={style.title}>{this.props.object.itemId.name}</Text>
            <Text style={style.description}>{this.props.object.itemId.description}</Text>
          </View>
          <View style={{flex: 1}}>
            <Button style={style.btn1} onPress={() => this.deleteConfirm()}>X</Button>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Image 
              source={{uri: `https://storage.googleapis.com/arniture/${this.props.object.itemId.img}`}}
              style={style.thumbnail} />
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={style.totalPrice}>Rp. {this.toRp(this.props.object.totalPrice)}</Text>
            <Text style={style.price}>@Rp. {this.toRp(this.props.object.itemId.price)}</Text>
            <View style={{flex: 1, marginTop: 20, flexDirection: 'row', alignSelf: 'flex-end'}}>
              <Button style={style.btn2} onPress={() => this.decrease()}>-</Button>
              <Text style={style.qty}>{this.props.object.quantity}</Text>
              <Button style={style.btn2} onPress={() => this.increase()}>+</Button>
            </View>
          </View>
        </View>
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
    width: 128,
    height: 128,
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
    fontWeight: '300'
  },
  qty: {
    paddingTop: 5,
    paddingHorizontal: 15,
    fontSize: 24,
    fontWeight: '600'
  },
  totalPrice: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '600'
  },
  btn1: {
    backgroundColor: "#d32f2f",
    color: "white",
    padding: 5,
    width: 40,
    alignSelf: 'flex-end'
  },
  btn2: {
    backgroundColor: "#00796B",
    color: "white",
    padding: 5,
    margin: 2,
    width: 40,
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