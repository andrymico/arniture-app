import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { AR } from '../js/screens/AR'
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

describe ('<AR />', () => {
  it('should renders without crashing', () => {
    <Provider store ={store}>
      <AR />
    </Provider>    
  })
  
  it('match snapshot', () => {
    const wrapper = shallow(
      <Provider store ={store}>
        <AR />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})