import {
  GET_ITEMS_LOADING,
  GET_ITEMS_ERROR,
  GET_ITEMS_SUCCESS } from './action.types'

const initialState = {
  loading: false,
  error: {
    status: false,
    message: ''
  },
  data: []
}

const reducers = (state = {...initialState}, action) => {
  switch (action.type) {
    case GET_ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_ITEMS_ERROR:
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.message
        }
      }
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...action.payload]
      }
    default: 
    return state
  }
}

export default reducers