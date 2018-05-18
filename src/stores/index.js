import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import registerReducers from './register/reducers'
import loginReducers from './login/reducers'
import objectReducers from './objects/reducers'

const rootReducer = combineReducers({
  register: registerReducers, 
  login: loginReducers,
  objects: objectReducers
})
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default store