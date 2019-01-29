import { 
  GET_COMICS_REQUEST, 
  GET_COMICS_SUCCESS,
  GET_COMIC_NAMES 
} from '../actions/comicsActions';

export const initialState = {
  data: []
}


export default (state = initialState, action) => {
  switch(action.type) {
    case GET_COMICS_REQUEST:
      return {
        ...state
      }
    case GET_COMICS_SUCCESS:
      return {
        ...state
      }
    case GET_COMIC_NAMES:
      return { 
        ...state,
        data: action.comics
      }
    default:
      return state;
  }
}; // End reducer