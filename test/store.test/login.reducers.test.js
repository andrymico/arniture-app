import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducer from '../../js/stores/login/reducers';
import * as types from '../../js/stores/login/action.types';

describe('Login reducers', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isLogin: false,
      token: '',
      errorMessage: ''
    })
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.LOGIN_SUCCESS,
        payload: 'token'
      })
    ).toEqual({
      isLogin: true,
      token: 'token',
      errorMessage: ''
    })
  });

  it('should handle LOGIN_FAIL', () => {
    expect(
      reducer([], {
        type: types.LOGIN_FAIL,
        payload: 'Error'
      })
    ).toEqual({
      isLogin: false,
      token: '',
      errorMessage: 'Error'
    })
  });

  it('should handle RESET', () => {
    expect(
      reducer([], {
        type: types.RESET
      })
    ).toEqual({
      isLogin: false,
      token: '',
      errorMessage: ''
    })
  });
});
