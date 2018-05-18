import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import objectReducers from './objects/reducers';

const reducers = combineReducers({
  objects: objectReducers
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store