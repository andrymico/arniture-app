import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Catalogue } from '../js/components/Catalogue';
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

describe('<Catalogue />', () => {
  let wrapper
  const mockGetItems = jest.fn()
  const mockNavigation = { navigate: jest.fn() }
  const mockData = { data: [''] }

  beforeAll(() => {
    wrapper = shallow(
      <Catalogue
        store={store}
        nav ={mockNavigation}
        items={mockData}
        getItems={mockGetItems} />
    )
  })

  it('should run redirect to Cart page when press button cart', () => {
    const btnCart = wrapper.find('Button').at(0)

    btnCart.simulate('press')
    expect(mockNavigation.navigate.mock.calls[0][0]).toEqual('Cart')
  });

  it('should render item card on page', () => {
    wrapper.instance().renderCard()
  });
})