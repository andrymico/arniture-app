import {
  GET_CART
} from './action.types'
import axios from 'axios'
import { AsyncStorage } from 'react-native'

const endPoint = 'http://35.198.234.250/cart/'
let token = AsyncStorage.getItem('token')

export const AddToCart = (itemId) => {
  axios.post(endPoint, {
    itemId: itemId  
  }, {
    headers: {
      token: token
    }
  })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (err) {
      console.log(err)
    })
}

export const getCart = () => {
  return dispatch => {
    axios.get(endPoint, {
      token
    })
      .then(function (response) {
        dispatch(getCartReducer(response.data.cart))
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}

const getCartReducer = (payload) => ({
  type: GET_CART,
  payload: payload
})

