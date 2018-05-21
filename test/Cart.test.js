import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import store from '../js/stores/index'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

Enzyme.configure({ adapter: new Adapter() })

import Cart from '../js/screens/Cart'
import { Text } from 'react-native'
import Button from 'react-native-button'
import CartItem from '../js/components/CartItem'

describe('<Cart />', () => {
  it('should renders without crashing', () => {
    <Provider store={store}>
      <Cart />
    </Provider>
  })
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Cart />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should have Button, Text, CartItem components', () => {
    const wrapper = shallow(<Cart store={store} />)
    expect(wrapper.containsAllMatchingElements([
      <Text />,
      <Button/>,
      <CartItem />
    ]))
  })
})