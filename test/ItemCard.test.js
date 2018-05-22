import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import store from '../js/stores/index'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { ItemCard } from '../js/components/ItemCard';
import Button from 'react-native-button';

Enzyme.configure({ adapter: new Adapter() });

describe('test the environment', () => {
  test('works, hopefully', () => {
    expect(true).toEqual(true)
  })
})

describe('<ItemCard />', () => {
  let wrapper
  const mockCreateAR= jest.fn()
  const mockNavigation = { navigate: jest.fn()}
  const mockAddToCart = jest.fn()
  const mockItem = {
    item_id: '',
    name: '',
    description: '',
    price: '',
    img: ''
  }

  beforeEach(() => {
    wrapper = shallow(
      <ItemCard
        store={store}
        createObjectAR={mockCreateAR}
        addToCart={mockAddToCart}
        item={mockItem}
         />
    )
  })

  it('should renders without crashing', () => {
    <Provider store={store}>
      <ItemCard />
    </Provider>
  });

  it('should crate object AR when already in AR Scene', () => {
    const btnSimulate = wrapper.find(Button).at(0)

    btnSimulate.simulate('press')
    expect(mockCreateAR.mock.calls.length).toBe(1)
  });

  it('should redirect to AR screen when press simulate AR', () => {
    wrapper = shallow(
      <ItemCard
        store={store}
        createObjectAR={mockCreateAR}
        nav={mockNavigation}
        addToCart={mockAddToCart}
        item={mockItem}
         />
    )
    const btnSimulate = wrapper.find(Button).at(0)

    btnSimulate.simulate('press')
    expect(mockNavigation.navigate.mock.calls[0][0]).toEqual('AR')
  });

  it('should add item to cart when press button add to cart', () => {
    const btnAddToCart = wrapper.find(Button).at(1)

    btnAddToCart.simulate('press')
    expect(mockAddToCart.mock.calls.length).toBe(1)
  });
})