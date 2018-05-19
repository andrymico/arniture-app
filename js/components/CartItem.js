import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import Button from 'react-native-button';

class CartItem extends Component {
  render() {
    return (
      <View style={style.card}>
        <Button style={style.btn1} onPress={() => alert(`Simulate AR ${this.props.object}`)}>X</Button>
        <Image 
          source={{uri: this.props.object.itemId.img}}
          style={style.thumbnail} />
        <Text style={style.title}>{this.props.object.itemId.name}</Text>
        <Text style={style.description}>{this.props.object.itemId.name}</Text>
        <Text style={style.price}>{this.props.object.itemId.price}</Text>
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

export default CartItem