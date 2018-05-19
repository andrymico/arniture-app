import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET
 } from './action.types'

const initialState = {
  isRegistered: false,
  errorMessage: 'none'
}

const reducers = (state = { ...initialState }, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS: 
      return {
        ...initialState,
        isRegistered: true
      }
    case REGISTER_FAIL: 
      return {
        ...initialState,
        isRegistered: false,
        errorMessage: action.payload
      }
    case RESET: 
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default reducers