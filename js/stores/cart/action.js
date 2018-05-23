import {
  GET_CART_LOADING,
  GET_CART_ERROR,
  GET_CART_SUCCESS,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_TO_CART,
} from './action.types'
import axios from 'axios'
let endPoint = 'http://ec2-34-237-243-5.compute-1.amazonaws.com/'
export const getCart = (token) => {
  return dispatch => {
    dispatch(getCartLoading())
    axios.get('http://ec2-34-237-243-5.compute-1.amazonaws.com/cart', {
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
export const increaseQuantity = (cartId) => {
  return dispatch => {
    axios.put(endPoint+'cart/increase/'+cartId)
      .then(function (response) {
        // console.log(response)
      })
      .catch(function (err) {
        // console.log(err)
      })
  }
}
export const decreaseQuantity = (cartId) => {
  return dispatch => {
    axios.put(endPoint+'cart/decrease/'+cartId)
      .then(function (response) {
        // console.log(response)
      })
      .catch(function (err) {
        // console.log(err)
      })
  }
}
export const addToCart = (itemId, token, price) => {
  return dispatch => {
    // axios.post('http://ec2-34-237-243-5.compute-1.amazonaws.com/users/signup', {email: token, password: token.toString(), role: 'user'})
    axios.post('http://ec2-34-237-243-5.compute-1.amazonaws.com/cart', {
      itemId: itemId,
      quantity: 1,
      totalPrice: price
    }, {
      headers: {
        token: token
      }
    })
      .then(function (response) {
        // console.log(response)
      })
      .catch(function (err) {
        // console.log(err)
      })
  }
}

const addToCartSuccess = (payload) => ({
  type: ADD_TO_CART,
  payload: payload
})

export const removeCart = (cartId) => {
  axios.delete(endPoint+'cart/'+cartId)
    .then(function (response) {
      // console.log(response)
    })
    .catch(function (err) {
      // console.log(err)
    })
}
const getCartLoading = () => ({
  type: GET_CART_LOADING
})
const getCartError = (err) => ({
  type: GET_CART_ERROR,
  message: err
})
const getCartSuccess = (payload) => ({
  type: GET_CART_SUCCESS,
  payload: payload
})
export const updateCart = (payload) => {
  return dispatch => {
    dispatch(updateCartStore(payload))
  }
}
const updateCartStore = (payload) => ({
  type: INCREASE_QUANTITY,
  payload: payload
})
export const deleteCart = (id, payload) => {
  return dispatch => {
    axios.delete(endPoint+'cart/' + id)
      .then(function (response) {
        // console.log(response)
      })
      .catch(function (err) {
        // console.log(err)
      })
  }
}