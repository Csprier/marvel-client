import { GET_CHARACTERS } from '../actions/characterActions';

export const initialState = {
  characters: []
}


export default (state = initialState, action) => {
  switch(action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.characters
      }
    default:
      return state;
  }
}; // End reducer