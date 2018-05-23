import {
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