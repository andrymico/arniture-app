import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Image,
  ActivityIndicator
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

  toHome() {
    this.props.navigation.navigate('Home')
  }

  toCheckout() {
    this.props.navigation.navigate('Checkout')
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

  toRp(price) {
    return price.toLocaleString()
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
          <View style={{alignSelf: 'flex-start', marginHorizontal: 10}}>
            <TouchableHighlight style={style.buttons}
              onPress={() => this.toHome()}
              underlayColor={'#00000000'} >
              <Image source={require('../assets/button-back.png')} />
            </TouchableHighlight>
          </View>

          <Text style={style.header}>User Cart</Text>
          <View style={style.total}>
            <View style={{flex: 1, flexDirection: 'row', }}>
              <View style={{flex: 1}}>
                <Text style={style.grandTotal}>Grand Total</Text>
                <Text>Your Account Balance</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text style={style.grandTotal}>Rp. {this.toRp(totalPrice)}</Text>
                <Text>Rp. 0</Text>
              </View>
            </View>
            <Button style={style.btn1} onPress={() => this.toCheckout()}>Checkout</Button>
          </View>
          {
            this.props.cart.loading ?
            <ActivityIndicator style={{paddingTop: 50}} size="large" color="#fff" /> :
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
    marginTop: 12,
    marginBottom: 36,
    alignSelf: 'center'
  },
  grandTotal: {
    fontWeight: '600', 
    fontSize: 24
  },
  btn1: {
    marginTop: 30,
    backgroundColor: "#00796B",
    color: "white",
    padding: 5,
    paddingVertical: 10,
    width: 240
  },
  total: {
    backgroundColor: '#fff', 
    alignItems: 'center', 
    marginHorizontal: 10, 
    marginVertical: 5, 
    padding: 10
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
})

const mapStateToProps = (state) => ({
  token: state.login.token,
  cart: state.cart
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCart
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Cart)