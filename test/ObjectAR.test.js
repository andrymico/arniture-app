import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import store from '../js/stores/index'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { ObjectAR } from '../js/components/ObjectAR';
import ObjectAR2 from '../js/components/ObjectAR';
import { Alert } from 'react-native';

Enzyme.configure({ adapter: new Adapter() });

describe('test the environment', () => {
  test('works, hopefully', () => {
    expect(true).toEqual(true)
  })
})

describe('<ObjectAR />', () => {
  let wrapper
  let wrapperConnect
  let mockObjects = { ARobjects: [''] }
  let mockId = 0
  let mockRemoveObject = jest.fn()
  let mockAddToCart = jest.fn()
  let mockToken = 'token'
  let mockObject = {
    _id: '',
    price: ''
  }
  let mockComponent = { setNativeProps: jest.fn() }

  beforeEach(() => {
    wrapper = shallow(
      <ObjectAR
        objects={mockObjects}
        object={mockObject}
        token={mockToken}
        id={mockId}
        removeObjectAR={mockRemoveObject}
        addToCart={mockAddToCart}
        store={store} />
    )
    wrapperConnect = shallow(
      <ObjectAR2 store={store} />
    )

    jest.mock('Alert', () => {
      return { alert: jest.fn() }
    })
  })
  
  it('should renders without crashing', () => {
    <Provider store={store}>
      <ObjectAR />
    </Provider>
  })

  it('match snapshot', () => {
    const wrapperSnapshot = shallow(
      <Provider store={store}>
        <ObjectAR />
      </Provider>
    )
  });

  it('should have initial state text, rotiation, position, & clickFlag', () => {
    expect(wrapper.state('text')).toEqual('Initializing AR...')
    expect(wrapper.state('rotation')).toEqual([0, 45, 0])
    expect(wrapper.state('position')).toEqual([0, -1, -1])
    expect(wrapper.state('clickFlag')).toEqual(0)
  });

  it('should display dialog modal when the object is double tapped', () => {
    wrapper.setState({ clickFlag: 0})
    wrapper.instance()._onClick()
    expect(Alert.alert).toHaveBeenCalled()
  });

  it('should add to cart when the button pressed', () => {
    Alert.alert.mock.calls[0][2][0].onPress()
    expect(mockAddToCart.mock.calls.length).toBe(1)
  });

  it('should delete 3D object when button delete pressed', () => {
    Alert.alert.mock.calls[0][2][1].onPress()
    expect(mockRemoveObject.mock.calls.length).toBe(1)
  })

  it('should reset clickFlag state when onDrag is occured', () => {
    wrapper.instance()._onDrag()
    expect(wrapper.state('clickFlag')).toBe(0)
  })

  it('should change arNodeRef', () => {
    wrapper.instance()._setARNodeRef(mockComponent)
  });
});

