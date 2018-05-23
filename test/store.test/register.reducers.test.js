import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducer from '../../js/stores/register/reducers';
import * as types from '../../js/stores/register/action.types';

describe('Register reducers', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isRegistered: false,
      errorMessage: ''
    })
  });

  it('should handle REGISTER__SUCCESS', () => {
    expect(
      reducer([], {
        type: types.REGISTER_SUCCESS,
      })
    ).toEqual({
      isRegistered: true,
      errorMessage: ''
    })
  });

  it('should handle REGISTER_FAIL', () => {
    expect(
      reducer([], {
        type: types.REGISTER_FAIL,
        payload: 'Error'
      })
    ).toEqual({
      isRegistered: false,
      errorMessage: 'Error'
    })
  });

  it('should handle RESET', () => {
    expect(
      reducer([], {
        type: types.RESET
      })
    ).toEqual({
      isRegistered: false,
      errorMessage: ''
    })
  });
});
