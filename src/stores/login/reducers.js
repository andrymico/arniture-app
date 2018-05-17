import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  RESET
} from './action.types'

const initialState = {
  isLogin: false,
  token: '',
  errorMessage: ''
}


const reducers = (state = { ...initialState }, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: 
      return {
        ...initialState,
        isLogin: true,
        token: action.payload
      }
    case LOGIN_FAIL: 
      return {
        ...initialState,
        isLogin: false,
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