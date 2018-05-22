import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import store from '../js/stores/index'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { AR } from '../js/screens/AR';

import {
  TouchableHighlight
} from 'react-native';

Enzyme.configure({ adapter: new Adapter() });

const apiKey = '43F28D4C-8082-4728-A51A-734CAD385246'

describe('test the environment', () => {
  test('works, hopefully', () => {
    expect(true).toEqual(true)
  })
})

describe ('<AR />', () => {
  let wrapper
  const mockNavigation = { navigate: jest.fn() }
  const mockReset = jest.fn()
  const mockData = { data: [] }
  
  beforeEach(() => {
    wrapper = shallow(
      <AR
        store={store}
        navigation={mockNavigation}
        reset={mockReset}
        items={mockData} />
    )
  })
  
  it('should renders without crashing', () => {
    <Provider store={store}>
      <AR />
    </Provider>
  })
  
  it('match snapshot', () => {
    const wrapperSnapshot = shallow(
      <Provider store={store}>
        <AR />
      </Provider>
    )
    expect(wrapperSnapshot).toMatchSnapshot()
  })

  it('should have valid apiKey in state', () => {
    expect(wrapper.state('apiKey')).toEqual(apiKey)
  });

  it('should redirect to Home when press the back button', () => {
    const btnBack = wrapper.find(TouchableHighlight).at(0)

    btnBack.simulate('press')
    expect(mockNavigation.navigate.mock.calls[0][0]).toEqual('Home')
  });

  it('should clear the AR object on screen when press the reset button', () => {
    const btnReset = wrapper.find(TouchableHighlight).at(1)

    btnReset.simulate('press')
    expect(mockReset.mock.calls.length).toBe(1)
  })

  it('should navigate to Cart when press the cart button', () => {
    const btnCart = wrapper.find(TouchableHighlight).at(2)

    btnCart.simulate('press')
    expect(mockNavigation.navigate.mock.calls.length).toBe(2)
  });

  it('should render object furniture list', () => {
    wrapper.instance().renderList()
  })
})