import { UPDATE_SEARCH_TERM } from '../actions/searchActions';

export const initialState = {
  searchTerm: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm
      }
    default:
      return state;
  }
}; // End reducer