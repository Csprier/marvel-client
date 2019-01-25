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
        ...state
      }
    case GET_CHARACTERS_SUCCESS:
      return {
        ...state
      }
    case GET_CHARACTER_NAMES:
      return { // THIS IS NOT RIGHT YET
        ...state,
        data: action.characters
      }
    default:
      return state;
  }
}; // End reducer