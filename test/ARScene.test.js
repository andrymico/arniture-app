import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import store from '../js/stores/index'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { ARScene } from '../js/components/ARScene';

Enzyme.configure({ adapter: new Adapter() });

describe('test the environment', () => {
  test('works, hopefully', () => {
    expect(true).toEqual(true)
  })
})

describe('<ARScene />', () => {
  let wrapper
  const mockObjects = { ARobjects: [''] }

  beforeEach(() => {
    wrapper = shallow(
      <ARScene 
        store={store} 
        objects={mockObjects} />
    )
  })

  it('should renders without crashing', () => {
    <Provider store={store}>
      <ARScene />
    </Provider>
  })

  it('match snapshot', () => {
    const wrapperSnapshot = shallow(
      <Provider store={store}>
        <ARScene />
      </Provider>
    )
    expect(wrapperSnapshot).toMatchSnapshot()
  })

  it('should renders 3D AR object', () => {
    wrapper.instance().showObjectAR()
  })
});