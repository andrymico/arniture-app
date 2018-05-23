import {
  CREATE_AR_OBJECT,
  REMOVE_AR_OBJECT,
  RESET
} from './action.types';
import { Alert } from 'react-native'
import axios from 'axios'

export const createObjectAR = (newObject) => {
  return dispatch => {
    dispatch(actionCreateAR(newObject))
  }
}

export const removeObjectAR = (payload) => {
  return dispatch => {
    dispatch(removeARobjects(payload))
  }
}

export const reset = () => {
  return dispatch => {
    dispatch(resetThis())
  }
}

const actionCreateAR = (newObject) => ({
  type: CREATE_AR_OBJECT,
  payload: newObject
})

const removeARobjects = (payload) => ({
  type: REMOVE_AR_OBJECT,
  payload: payload
})

const resetThis = () => ({
  type: RESET
})