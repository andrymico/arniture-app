import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducer from '../../js/stores/cart/reducers';
import * as types from '../../js/stores/cart/action.types';

describe('Cart reducers', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: {
        status: false,
        message: ''
      },
      data: []
    })
  });

  it('should handle GET_CART_LOADING', () => {
    expect(
      reducer([], {
        type: types.GET_CART_LOADING,
      })
    ).toEqual({
      loading: true
    })
  });

  it('should handle GET_CART_ERROR', () => {
    expect(
      reducer([], {
        type: types.GET_CART_ERROR,
        message: 'Error'
      })
    ).toEqual({
      loading: false,
      error: {
        status: true,
        message: 'Error'
      }
    })
  });

  it('should handle GET_CART_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_CART_SUCCESS,
        payload: ['test']
      })
    ).toEqual({
      loading: false,
      data: ['test']
    })
  });

  it('should handle INCREASE_QUANTITY', () => {
    expect(
      reducer([], {
        type: types.INCREASE_QUANTITY,
        payload: [{quantity: 1}]
      })
    ).toEqual({
      data: [{quantity: 1}]
    })
  });

  it('should handle DECREASE_QUANTITY', () => {
    expect(
      reducer([], {
        type: types.DECREASE_QUANTITY,
        payload: [{quantity: 0}]
      })
    ).toEqual({
      data: [{quantity: 0}]
    })
  });
});