import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as registerActions from '../../js/stores/register/action';

Enzyme.configure({ adapter: new Adapter() })

const randomTest = Math.random()
const newUser = {
  email: 'test@email.com'+randomTest,
  password: 'konde123'
}

describe('Register Actions', () => {
  it('register new user successful', () => {
    const register = registerActions.register(newUser.email, newUser.password)
    register()
  });

  it('register new user failed', () => {
    const register = registerActions.register()
    register()
  })

  it('should dispatch register success', () => {
    const expectedAction = {
      type: 'REGISTER_SUCCESS'
    }
    expect(registerActions.registerSuccess()).toEqual(expectedAction)
  });

  it('should dispatch register failed', () => {
    const expectedAction = {
      type: 'REGISTER_FAIL',
      payload: 'err'
    }
    expect(registerActions.registerFail('err')).toEqual(expectedAction)
  });

  it('should reset register state', () => {
    const resetRegister = registerActions.reset()
  });

  it('should dispatch reset', () => {
    const expectedAction = {
      type: 'RESET'
    }
    expect(registerActions.reset()).toEqual(expectedAction)
  });
});