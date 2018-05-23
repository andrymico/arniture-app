import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock'
import * as actions from '../../js/stores/cart/action';
import * as types from '../../js/stores/cart/action.types';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({ todos: [] })

describe('Cart actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('get cart items success', () => {
    const token = 'token'
    const payload = [{payload: 'payload'}]
    const expectedActions = [
      { type: types.GET_CART_LOADING },
      { type: types.GET_CART_SUCCESS, payload },
    ]

    return store.dispatch(actions.getCart(token))
  });

  it('get cart items failed', () => {
    const error = 'Error'
    const expectedActions = [
      { type: types.GET_CART_LOADING },
      { type: types.GET_CART_ERROR, error },
    ]

    return store.dispatch(actions.getCart())
  });

  it('should increase quantity', () => {
    const cartId = '01'
    const expectedActions = [
      { type: types.INCREASE_QUANTITY }
    ]

    return store.dispatch(actions.increaseQuantity(cartId))
  });

  it('should decrease quantity', () => {
    const cartId = '01'
    const expectedActions = [
      { type: types.DECREASE_QUANTITY }
    ]

    return store.dispatch(actions.decreaseQuantity(cartId))
  });

  it('should add item to cart', () => {
    const itemId = '01'
    const token = 'token'
    const price = 100000
    const expectedActions = [
      { type: types.ADD_TO_CART }
    ]

    return store.dispatch(actions.addToCart(itemId, token, price))
  });
});