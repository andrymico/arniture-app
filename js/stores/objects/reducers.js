import {
  LOAD_OBJECTS,
  ACTION_PENDING,
  ACTION_ERROR,
  CREATE_AR_OBJECT,
  REMOVE_AR_OBJECT,
  RESET
} from './action.types';

const initialState = {
  objects: [],
  ARobjects: [],
  loading: false,
  error: {
    status: false,
    message: ''
  }
}

const objectReducers = (state = {...initialState}, action) => {
  switch (action.type) {
    case ACTION_PENDING:
      return {
        ...state,
        loading: true
      }
    case ACTION_ERROR:
      let errObj = {
        status: true,
        message: action.payload
      }
      return {
        ...state,
        loading: false,
        error: errObj
      }
    case LOAD_OBJECTS:
      return {
        ...state,
        objects: action.payload
      }
    case CREATE_AR_OBJECT:
      let newARojbects = [
        ...state.ARobjects,
        action.payload
      ]
      return {
        ...state,
        ARobjects: [
          ...state.ARobjects,
          action.payload
        ]
      }
    case REMOVE_AR_OBJECT:
      return {
        ...state,
        ARobjects: [...action.payload]
      }
    case RESET:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default objectReducers