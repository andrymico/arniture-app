import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock'
import * as actions from '../../js/stores/objects/actions';
import * as types from '../../js/stores/objects/action.types';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({ todos: [] })

describe('Objects actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('should create AR object', () => {
    const newObj = { name: 'name' }
    const expectedActions = [
      { type: types.CREATE_AR_OBJECT}
    ]

    return store.dispatch(actions.createObjectAR())
      // .then(() => {
      //   expect(store.getActions()).toEqual(expectedActions)
      // })
  });

  it('should remove AR object', () => {
    const newObj = {}
    const expectedActions = [
      { type: types.REMOVE_AR_OBJECT }
    ]

    return store.dispatch(actions.removeObjectAR())
  });

  it('should reset AR display', () => {
    const expectedActions = [
      { type: types.RESET }
    ]

    return store.dispatch(actions.reset())
  });
});