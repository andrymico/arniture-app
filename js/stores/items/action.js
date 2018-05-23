import {
  GET_ITEMS_LOADING,
  GET_ITEMS_ERROR,
  GET_ITEMS_SUCCESS
 } from './action.types'

 import axios from 'axios'

 let endPoint = 'http://ec2-34-237-243-5.compute-1.amazonaws.com/items'

 export const getItems = () => {
   return dispatch => {
     dispatch(getItemsLoading())
    axios.get('http://ec2-34-237-243-5.compute-1.amazonaws.com/items')
      .then(function (response) {
        dispatch(getItemsSuccess(response.data.items))
      })
      .catch(function (err) {
        dispatch(getItemsError(err))
      })
   }
 }

 const getItemsLoading = () => ({
  type: GET_ITEMS_LOADING
 })

 const getItemsError = (message) => ({
   type: GET_ITEMS_ERROR,
   message: message
 })

 const getItemsSuccess = (payload) => ({
   type: GET_ITEMS_SUCCESS,
   payload: payload
 })

