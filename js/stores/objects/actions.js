import {
  LOAD_OBJECTS,
  ACTION_PENDING,
  ACTION_ERROR,
  CREATE_AR_OBJECT,
  REMOVE_AR_OBJECT
} from './action.types';
import { Alert } from 'react-native'

export const loadObjects = () => {
  return dispatch => {
  }
}

export const createObjectAR = (newObject) => {
  return dispatch => {
    dispatch(actionCreateAR(newObject))
  }
}

export const showDialog = () => {
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )
}

export const removeObjectAR = () => {
  return dispatch => {

  }
}

const actionPending = () => ({
  type: ACTION_PENDING
})

const actionError = () => ({
  type: ACTION_ERROR
})

const loadObjectsEvent = () => ({
  type: LOAD_OBJECTS
})

const actionCreateAR = (newObject) => ({
  type: CREATE_AR_OBJECT,
  payload: newObject
})

const removeARobjects = () => ({
  type: REMOVE_AR_OBJECT
})