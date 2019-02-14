import { 
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR
} from '../actions/protected-data';

const initialState = {
  data: '',
  error: null
};

export default function protectedDataReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_PROTECTED_DATA_SUCCESS:
      return {
        data: action.data
      }
    case FETCH_PROTECTED_DATA_ERROR:
      return {
        error: action.error
      }
    default:
      return state;
  }
}