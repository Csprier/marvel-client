import { 
  GET_CHARACTERS_REQUEST, 
  GET_CHARACTERS_SUCCESS,
  GET_CHARACTER_NAMES 
} from '../actions/charactersActions';

export const initialState = {
  data: []
}


export default (state = initialState, action) => {
  switch(action.type) {
    case GET_CHARACTERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case GET_CHARACTER_NAMES:
      return {
        ...state,
        loading: false,
        data: action.characters
      }
    default:
      return state;
  }
}; // End reducer