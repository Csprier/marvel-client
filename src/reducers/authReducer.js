import {
  CLEAR_TOKEN, 
  REQUEST_LOGIN, 
  LOGIN_SUCCESS, 
  LOGIN_ERROR 
} from '../actions/authActions';

const initialState = {
	user: null,
	loading: false,
	error: null
};

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case CLEAR_TOKEN:
      return {
        ...state,
			  user: null
      }
    case REQUEST_LOGIN:
      return {
        ...state,
			  loading: true,
			  error: null
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.user
      }
    case LOGIN_ERROR:
      return {
        ...state,
			  error: action.error,
			  loading: false
      }
    default:
      return state;
  }
}; // End reducer