import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock'
import * as actions from '../../js/stores/items/action';
import * as types from '../../js/stores/items/action.types';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({ todos: [] })

describe('Item actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('get item list successfully', () => {
    const expectedActions = [
      { type: types.GET_ITEMS_LOADING },
      { type: types.GET_ITEMS_SUCCESS, payload: []},
      { type: types.GET_ITEMS_ERROR, message: 'Error' }
    ]

    return store.dispatch(actions.getItems())
  });
});
