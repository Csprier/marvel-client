import { 
  UPDATE_SEARCH_TERM, 
  UPDATE_COMIC_SEARCH_TERM 
} from '../actions/searchActions';

export const initialState = {
  searchTerm: '',
  comicSearchTerm: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm
      }
    case UPDATE_COMIC_SEARCH_TERM:
      return {
        ...state,
        comicSearchTerm: action.comicSearchTerm
      }
    default:
      return state;
  }
}; // End reducer