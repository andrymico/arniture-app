import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET
  
} from './action.types'
import axios from 'axios'

const endPoint = 'http://35.198.234.250/users/signup'

export const register = (email, password) => {
  return dispatch => {
    axios.post(endPoint, {
      email: email,
      password: password,
      role: 'user'
    })
      .then(function (response) {
        dispatch(registerSuccess())
      })
      .catch(function (err) {
        dispatch(registerFail(err.response.data.message))
      })
  }
}

const registerFail = (err) => ({
  type: REGISTER_FAIL,
  payload: err
})

const registerSuccess = () => ({
  type: REGISTER_SUCCESS
})

export const resetRegisterState = () => {
  return dispatch => {
    dispatch(reset())
  }
}

const reset = () => ({
  type: RESET
})
