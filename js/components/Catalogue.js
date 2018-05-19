import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import ItemCard from './ItemCard';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getItems } from '../stores/items/action'

class Catalogue extends Component {
  componentDidMount() {
    this.props.getItems()
  }
  renderCard() {
    let objectList = []
    
    this.props.items.data.forEach((item, i) => {
      objectList.push(<ItemCard key={`card-${i}`} item={item} nav={this.props.nav} />)
    })

    return objectList
  }

  render() {
    return (
      <View style={style.container}>
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
    backgroundColor: '#d32f2f'
  },
  header: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 36,
    alignSelf: 'center'
  }
})

const mapStateToProps = (state) => ({
  items: state.items
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getItems
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (Catalogue)