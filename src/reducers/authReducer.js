import {
  SET_AUTH_TOKEN,
  CLEAR_TOKEN, 
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  REQUEST_LOGIN, 
  LOGIN_SUCCESS, 
  LOGIN_ERROR 
} from '../actions/authActions';

const initialState = {
  authToken: null, // authToken !== null does not mean it has been validated
	user: null,
	loading: false,
	error: null
};

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case SET_AUTH_TOKEN:
      return {
        authToken: action.authToken
      }
    case CLEAR_TOKEN:
      return {
        ...state,
			  user: null
      }
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case AUTH_SUCCESS:
      return {
        loading: false,
        user: action.user
      }
    case AUTH_ERROR:
      return {
        loading: false,
        error: action.error
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