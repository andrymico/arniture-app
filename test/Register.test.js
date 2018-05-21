import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Register } from '../js/screens/Register'
import { Provider } from 'react-redux'
import store from '../js/stores/index'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

Enzyme.configure({ adapter: new Adapter() });

describe('test the environment', () => {
  test('works, hopefully', () => {
    expect(true).toEqual(true)
  })
})

describe ('<Register />', () => {
  it('should renders without crashing', () => {
    <Provider store ={store}>
      <Register />
    </Provider>    
  })
  
  it('match snapshot', () => {
    const wrapper = shallow(
      <Provider store ={store}>
        <Register />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
  
  it('Register component should render with empty email and password', () => {
    const wrapper = shallow(<Register store={store}/>)
    expect(wrapper.state('email').length).toBe(0)
    expect(wrapper.state('password').length).toBe(0)
  })
})