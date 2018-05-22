import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Login } from '../js/screens/Login'
import { Provider } from 'react-redux'
import store from '../js/stores/index'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import {
  TextInput,
  TouchableHighlight
} from 'react-native';
import Button from 'react-native-button';

Enzyme.configure({ adapter: new Adapter() });

describe('test the environment', () => {
  test('works, hopefully', () => {
    expect(true).toEqual(true)
  })
})

describe ('<Login />', () => {
  let wrapper
  const mockLogin = jest.fn()
  const mockNavigation = { navigate: jest.fn() }

  beforeEach(() => {
    wrapper = shallow(
      <Login
        store={store}
        login={mockLogin}
        navigation={mockNavigation}
        isLogin={false} />
    )
  })

  it('should renders without crashing', () => {
    <Provider store ={store}>
      <Login />
    </Provider>    
  })
  
  it('match snapshot', () => {
    let wrapperSnapshot = shallow(
      <Provider store ={store}>
        <Login />
      </Provider>
    )
    expect(wrapperSnapshot).toMatchSnapshot()
  })
  
  it('should render with empty state of email and password', () => {
    expect(wrapper.state('email')).toBe('')
    expect(wrapper.state('password')).toBe('')
  })

  it('should login with registered email and password as arguments, then redirect to Home', async () => {
    const emailInput = wrapper.find(TextInput).at(0)
    const passInput = wrapper.find(TextInput).at(1)
    const buttonSubmit = wrapper.find(Button).at(0)

    emailInput.simulate('ChangeText', 'test@email.com')
    passInput.simulate('ChangeText', 'konde123')
    expect(wrapper.state('email')).toEqual('test@email.com')
    expect(wrapper.state('password')).toEqual('konde123')

    buttonSubmit.simulate('press')
    await expect(mockLogin.mock.calls.length).toBe(1)
    expect(mockLogin.mock.calls[0][0]).toEqual('test@email.com')
    expect(mockLogin.mock.calls[0][1]).toEqual('konde123')
    expect(mockNavigation.navigate.mock.calls.length).toBe(0)
    expect(wrapper.state('email')).toEqual('')
    expect(wrapper.state('password')).toEqual('')
  });

  it('should redirect to Home if login authentication successful', async () => {
    wrapper = shallow(
      <Login
        store={store}
        login={mockLogin}
        navigation={mockNavigation}
        isLogin={true} />
    )
    const emailInput = wrapper.find(TextInput).at(0)
    const passInput = wrapper.find(TextInput).at(1)
    const buttonSubmit = wrapper.find(Button).at(0)

    emailInput.simulate('ChangeText', 'test@email.com')
    passInput.simulate('ChangeText', 'konde123')
    expect(wrapper.state('email')).toEqual('test@email.com')
    expect(wrapper.state('password')).toEqual('konde123')

    buttonSubmit.simulate('press')

    await expect(mockLogin.mock.calls.length).toBe(2)
    expect(mockLogin.mock.calls[0][0]).toEqual('test@email.com')
    expect(mockLogin.mock.calls[0][1]).toEqual('konde123')
    expect(mockNavigation.navigate.mock.calls.length).toBeGreaterThan(0)
    expect(wrapper.state('email')).toEqual('')
    expect(wrapper.state('password')).toEqual('')
  });

  it('should go to register page when press link "Not a user? Register here"', () => {
    const registerPageLink = wrapper.find(TouchableHighlight).at(0)

    registerPageLink.simulate('press')
    expect(mockNavigation.navigate.mock.calls.length).toBeGreaterThan(0)
  })
})