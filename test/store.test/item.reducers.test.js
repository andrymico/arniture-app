import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducer from '../../js/stores/items/reducers';
import * as types from '../../js/stores/items/action.types';

describe('Item reducers', () => {
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

  it('should handle GET_ITEMS_LOADING', () => {
    expect(
      reducer([], {
        type: types.GET_ITEMS_LOADING,
        loading: true
      })
    ).toEqual({
      loading: true
    })
  });

  it('should handle GET_ITEMS_ERROR', () => {
    expect(
      reducer([], {
        type: types.GET_ITEMS_ERROR,
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

  it('should handle GET_ITEMS_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_ITEMS_SUCCESS,
        loading: false,
        payload: []
      })
    ).toEqual({
      loading: false,
      data: []
    })
  });
});