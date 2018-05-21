import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Login } from '../js/screens/Login'
import { Provider } from 'react-redux'
import store from '../js/stores/index'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import {
  Text,
  TouchableHightlight,
  TextInput
} from 'react-native'
import Button from 'react-native-button'

Enzyme.configure({ adapter: new Adapter() });

describe('test the environment', () => {
  test('works, hopefully', () => {
    expect(true).toEqual(true)
  })
})

describe ('<Login />', () => {
  it('should renders without crashing', () => {
    <Provider store ={store}>
      <Login />
    </Provider>    
  })
  
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Provider store ={store}>
        <Login />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
  
  it('Login component should render with empty email and password', () => {
    const wrapper = shallow(<Login store={store}/>)
    expect(wrapper.state('email').length).toBe(0)
    expect(wrapper.state('password').length).toBe(0)
  })

  it('Login component should have Text, TextInput, Button, TouchableHighlight', () => {
    const wrapper = shallow(<Login store={store} />)
    expect(wrapper.containsAllMatchingElements([
      <Text />,
      <TextInput />,
      <Button />,
      <TouchableHightlight />
    ]))
  })  
})