import {
  GET_CART,
  ADD_TO_CART,
  REMOVE_CART
} from './action.types'

const initialState = {
  cart: []
}

const cartReducers = (state = {...initialState}, action) => {
  switch (action.type) {
    case GET_CART: 
      return {
        cart: action.payload
      }
    default: 
    return state;
  }
}

export default cartReducers