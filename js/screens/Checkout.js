import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';

class Checkout extends Component {
  goToCart = () => {
    this.props.nav.navigate('Cart')
  }

  render() {
    return (
      <View style={style.container}>
        <ScrollView style={{width: '100%'}}>
          <View style={{alignSelf: 'flex-start', left: 0}}>
            <TouchableHighlight style={style.buttons}
              onPress={() => this.goToCart()}
              underlayColor={'#00000000'} >
              <Image source={require('../assets/button-back.png')} />
            </TouchableHighlight>
          </View>

          <Text style={style.header}>
            Confirm Payment
          </Text>
          <View style={style.detail}>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    color: '#d32f2f',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 36,
    alignSelf: 'center'
  },
  detail: {
    borderWidth: 1,
    borderColor: '#eaeaea',
    height: '200%', 
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

export default Checkout;