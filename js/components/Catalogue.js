import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  Button,
  CameraRoll,
  TouchableHighlight,
  Image
} from 'react-native';
import ItemCard from './ItemCard';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getItems } from '../stores/items/action'
import { captureScreen } from "react-native-view-shot";

class Catalogue extends Component {
  captureScreenFunction=()=>{
    captureScreen({
      format: "jpg",
      quality: 0.8
    })
    .then(
      uri => CameraRoll.saveToCameraRoll(uri),
      error => console.error("Oops, Something Went Wrong", error)
    );
  }
  componentDidMount() {
    this.props.getItems()
  }
  renderCard() {
    let objectList = []
    
    this.props.items.data.forEach((item, i) => {
      objectList.push(<ItemCard key={`card-${i}`} id={i} item={item} nav={this.props.nav} />)
    })

    return objectList
  }

  goToCart = () => {
    this.props.nav.navigate('Cart')
  }

  render() {
    return (
      <View style={style.container}>
          <View style={{backgroundColor: '#DA0048', width: '100%'}}>
            <View style={{alignSelf: 'flex-start', position: 'absolute', marginLeft: 24, marginTop: 24}}>
              <Text style={{color: '#fff', fontSize: 48, fontWeight: 'bold',}}>ARniture</Text>  
            </View>
            <View style={{alignSelf: 'flex-end', marginHorizontal: 10}}>
              <TouchableHighlight style={style.buttons}
                onPress={() => this.goToCart()}
                underlayColor={'#00000000'} >
                <Image source={require('../assets/button-cart.png')} />
              </TouchableHighlight>
            </View>
          </View>
        <ScrollView style={{width: '100%'}}>

          <Text style={style.header}>Catalogue</Text>
          { this.renderCard() }
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  header: {
    color: '#C60042',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 36,
    alignSelf: 'center'
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
  items: state.items
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getItems
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (Catalogue)