import {
  GET_CART_LOADING,
  GET_CART_ERROR,
  GET_CART_SUCCESS
} from './action.types'
import axios from 'axios'
import {AsyncStorage} from 'react-native';
let endPoint = 'http://ec2-34-237-243-5.compute-1.amazonaws.com/'

export const getCart = () => {
  return dispatch => {
    dispatch(getCartLoading())
    axios.get(endPoint+'cart', {
      headers: {
        token: token
      }
    })
      .then(function (response) {
        dispatch(getCartSuccess(response.data.cart))
      })
      .catch(function (err) {
        dispatch(getCartError(err))
      })
  }
}
export const addToCart = (itemId, token, price) => {
  return dispatch => {
    // axios.post('http://ec2-34-237-243-5.compute-1.amazonaws.com/users/signup', {email: token, password: token.toString(), role: 'user'})
    axios.post(endPoint+'cart', {
      itemId: itemId,
      quantity: 1,
      totalPrice: price
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
}
export const removeCart = (cartId) => {
  axios.delete(endPoint+'cart/'+cartId)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (err) {
      console.log(err)
    })
}
const getCartLoading = () => ({
  type: GET_CART_LOADING
})
const getCartError = (err) => ({
  type: getCartError,
  message: err
})
const getCartSuccess = (payload) => ({
  type: getCartSuccess,
  payload: payload
})