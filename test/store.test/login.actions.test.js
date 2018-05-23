import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock'
import * as actions from '../../js/stores/login/action';
import * as types from '../../js/stores/login/action.types';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({ todos: [] })

describe('Login actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('login user succesful', () => {
    const email = 'Ar'
    const password = 'ar'
    const expectedActions = [
      { type: types.LOGIN_SUCCESS }
    ]

    return store.dispatch(actions.login(email, password))
  });

  it('login user failed', () => {
    const expectedActions = [
      { type: types.LOGIN_FAIL }
    ]

    return store.dispatch(actions.login())
  });

  it('should reset login state', () => {
    const expectedActions = [
      { type: types.RESET }
    ]

    return store.dispatch(actions.resetLoginState())
  });
});