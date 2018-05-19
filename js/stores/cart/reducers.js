import {
  GET_CART_LOADING,
  GET_CART_ERROR,
  GET_CART_SUCCESS
} from './action.types'
const initialState = {
  loading: false,
  error: {
    status: false,
    message: ''
  },
  data: []
}
const cartReducers = (state = {...initialState}, action) => {
  switch (action.type) {
    case GET_CART_LOADING:
      return {
        ...this.state,
        loading: true
      }
    case GET_CART_ERROR:
      return {
        ...this.state,
        loading: false,
        error: {
          status: true,
          message: action.message
        }
      }
    case GET_CART_SUCCESS:
      return {
        ...this.state,
        loading: false,
        data: [...action.payload]
      }
    default: 
    return state;
  }
}
export default cartReducers