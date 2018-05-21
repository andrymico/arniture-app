import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import Button from 'react-native-button';
import CartItem from '../components/CartItem';
import { getCart } from '../stores/cart/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Cart extends Component {
  componentDidMount () {
    this.props.getCart(this.props.token)
  }
  toHome () {
    this.props.navigation.navigate('Home')
  }
  renderCard() {
    let cartList = []
    if(this.props.cart.data){
      this.props.cart.data.forEach((object, i) => {
        cartList.push(<CartItem key={`cart-${i}`} object={object} idx={i} />)
      })     
    }
    return cartList
  }
  render() {
    let totalPrice = 0
    if (this.props.cart.data) {
      this.props.cart.data.forEach(data => {
        totalPrice += data.totalPrice 
      })
    }
    return (
      <View style={style.container}>
        <ScrollView style={{width: '100%'}}>
          <Button 
            onPress={() => this.toHome()}>Back</Button>
          <Text style={style.header}>User Cart</Text>
          <View style={{backgroundColor: '#fff', alignItems: 'center', marginHorizontal: 10, marginVertical: 5, padding: 10}}>
            <View style={{flex: 1, flexDirection: 'row', }}>
              <View style={{flex: 1}}>
                <Text style={{fontWeight: '600', fontSize: 18}}>Grand Total</Text>
                <Text>Your Account Balance</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text style={{fontWeight: '600', fontSize: 18}}>{totalPrice}</Text>
                <Text>Rp. 0</Text>
              </View>
            </View>
            <Button style={style.btn1} onPress={() => alert(`Checkout`)}>Checkout</Button>
          </View>
          {
            this.props.cart.loading ? <Text>Loading</Text> :
            this.renderCard()                        
          }
          
        </ScrollView>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#d32f2f'
  },
  header: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 36,
    alignSelf: 'center'
  },
  btn1: {
    marginTop: 30,
    backgroundColor: "#00796B",
    color: "white",
    padding: 5,
    paddingVertical: 10,
    width: 240
  },
})
const mapStateToProps = (state) => ({
  token: state.login.token,
  cart: state.cart
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCart
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps) (Cart)