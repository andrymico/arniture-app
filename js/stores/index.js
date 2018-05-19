import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import objectReducers from './objects/reducers';
import loginReducers from './login/reducers';
import registerReducers from './register/reducers';
import cartReducers from './cart/reducers'

const reducers = combineReducers({
  objects: objectReducers,
  login: loginReducers,
  register: registerReducers
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store