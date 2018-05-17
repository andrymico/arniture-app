import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  RESET
} from './action.types'
import axios from 'axios'

const endPoint = 'http://35.198.234.250/users/signin'

export const login = (email, password) => {
  return dispatch => {
    axios.post(endPoint, {
      email: email,
      password: password
    })
      .then(function (response) {
        dispatch(loginSuccess(response.data.token))
      })
      .catch(function (err) {
        dispatch(loginFail(err.response.data.message))
      })
  }
}

const loginFail = (err) => ({
  type: LOGIN_FAIL,
  payload: err
})

const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token
})

export const resetLoginState = () => {
  return dispatch => {
    dispatch(reset())
  }
}

const reset = () => ({
  type: RESET
})