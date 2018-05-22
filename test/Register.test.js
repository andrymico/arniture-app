import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Register } from '../js/screens/Register'
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

describe('<Register />', () => {
  let wrapper
  const mockRegister = jest.fn()
  const mockLogin = jest.fn()
  const mockNavigation = { navigate: jest.fn() }

  beforeEach(() => {
    wrapper = shallow(
      <Register
        store={store}
        register={mockRegister}
        login={mockLogin}
        navigation={mockNavigation}
        isRegistered={false}/>
    )
  })

  it('should renders without crashing', () => {
    <Provider store ={store}>
      <Register />
    </Provider>
  })
  
  it('should match snapshot', () => {
    let wrapperSnapshot = shallow(
      <Provider store ={store}>
        <Register />
      </Provider>
    )

    expect(wrapperSnapshot).toMatchSnapshot()
  })
  
  it('should render with empty state of email and password', () => {
    expect(wrapper.state('email')).toBe('')
    expect(wrapper.state('password')).toBe('')
  })

  it('should register new user with the email and password in the state as arguments', () => {
    const emailInput = wrapper.find(TextInput).at(0)
    const passInput = wrapper.find(TextInput).at(1)
    const buttonSubmit = wrapper.find(Button).at(0)

    emailInput.simulate('ChangeText', 'test@email.com')
    passInput.simulate('ChangeText', 'konde123')
    expect(wrapper.state('email')).toEqual('test@email.com')
    expect(wrapper.state('password')).toEqual('konde123')

    buttonSubmit.simulate('press')
    expect(mockRegister.mock.calls.length).toBe(1)
    expect(mockRegister.mock.calls[0][0]).toEqual('test@email.com')
    expect(mockRegister.mock.calls[0][1]).toEqual('konde123')
  })

  it('should redirect to Home if user already registered', () => {
    wrapper = shallow(
      <Register
        store={store}
        register={mockRegister}
        login={mockLogin}
        navigation={mockNavigation}
        isRegistered={true}/>
    )
    const buttonSubmit = wrapper.find(Button).at(0)
    buttonSubmit.simulate('press')

    expect(mockLogin.mock.calls.length).toBe(1)
    expect(mockNavigation.navigate.mock.calls.length).toBe(1)
    expect(wrapper.state('email')).toEqual('')
    expect(wrapper.state('password')).toEqual('')
  });

  it('should go to login page when press link "Already a user, login here"', () => {
    const loginPageLink = wrapper.find(TouchableHighlight).at(0)

    loginPageLink.simulate('press')
    expect(mockNavigation.navigate.mock.calls.length).toBe(2)
  });
})