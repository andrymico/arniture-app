import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Catalogue } from '../js/components/Catalogue'
import { Provider } from 'react-redux'
import store from '../js/stores/index'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

Enzyme.configure({ adapter: new Adapter() });

