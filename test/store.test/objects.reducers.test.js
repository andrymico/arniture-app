import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducer from '../../js/stores/objects/reducers';
import * as types from '../../js/stores/objects/action.types';

describe('Objects reducers', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      objects: [],
      ARobjects: [],
      loading: false,
      error: {
        status: false,
        message: ''
      }
    })
  });

  it.skip('should handle CREATE_AR_OBJECT', () => {
    expect(
      reducer([], {
        type: types.CREATE_AR_OBJECT,
        payload: [...ARobjects, '']
      })
    ).toEqual({
      ARobjects: [...ARobjects, '']
    })
  });

  it('should handle REMOVE_AR_OBJECT', () => {
    expect(
      reducer([], {
        type: types.REMOVE_AR_OBJECT,
        payload: []
      })
    ).toEqual({
      ARobjects: []
    })
  });

  it('should handle RESET', () => {
    expect(
      reducer([], {
        type: types.RESET
      })
    ).toEqual({
      objects: [],
      ARobjects: [],
      loading: false,
      error: {
        status: false,
        message: ''
      }
    })
  });
});
