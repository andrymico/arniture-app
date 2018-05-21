import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import store from '../js/stores/index'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import Catalogue from '../js/components/Catalogue'
import Home from '../js/screens/Home'

Enzyme.configure({ adapter: new Adapter() })

describe('<Home />', () => {
  it('should renders without crashing', () => {
    <Provider store={store}>
      <Home />
    </Provider>
  })

  it('should match snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should contain Catalogue component', () => {
    const wrapper = shallow(<Home store={store} />)
    expect(wrapper.containsAllMatchingElements([
      <Catalogue />
    ]))
  })
})