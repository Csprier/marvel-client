import jwtDecode from 'jwt-decode';
// import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { saveAuthToken, clearAuthToken } from '../local-storage';

// ===========================================================================
// AUTH ACTIONS ===============
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN',
	setAuthToken = authToken => ({
		type: SET_AUTH_TOKEN,
		authToken
	});

// Removes authToken & user info from Redux state
export const CLEAR_TOKEN = 'CLEAR_TOKEN',
  clearToken = () => {
    return {
      type: CLEAR_TOKEN
    };
	};

export const AUTH_REQUEST = 'AUTH_REQUEST',
	authRequest = () => ({
		type: AUTH_REQUEST
	});

export const AUTH_SUCCESS = 'AUTH_SUCCESS',
	authSuccess = user => ({
		type: AUTH_SUCCESS,
		user
	});

export const AUTH_ERROR = 'AUTH_ERROR',
	authError = error => ({
		type: AUTH_ERROR,
		error
	});

//Store in localStorage & decompose into state
export const storeToken = (authToken, dispatch) => {
	const decodedToken = jwtDecode(authToken);
	dispatch(setAuthToken(authToken));
	dispatch(authSuccess(decodedToken.user));
	saveAuthToken(authToken);
	dispatch(loginSuccess(decodedToken.user));
};

export const refreshAuthToken = () => (dispatch, getState) => {
	dispatch(authRequest());
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/auth/refresh`, {
		method: 'POST',
		headers: {
			// provide the existing token as credentials to get a new one
			Authorization: `Bearer: ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(({ authToken }) => storeToken(authToken, dispatch))
	.catch(err => {
		// Invalid or Expired credentials will flag this error, or something else went wrong.
		// Clear everything and log out
		dispatch(authError(err));
		dispatch(clearAuthToken());
		clearAuthToken(authToken);
	});
};
	
// ===========================================================================
// LOGIN ACTIONS ===============
// Set loading to true
export const REQUEST_LOGIN = 'REQUEST_LOGIN',
  requestLogin = () => {
    return {
			type: REQUEST_LOGIN,
			loading: true
    };
  };

// Set loading to false & add user to Redux state
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  loginSuccess = user => {
    return {
			type: LOGIN_SUCCESS,
			loading: false,
      user
    };
  };  

// Set loading to false & add error to redux state
export const LOGIN_ERROR = 'LOGIN_ERROR',
  loginError = error => {
    return {
			type: LOGIN_ERROR,
			loading: false,
      error
    };
  };

// Asynch login call
export const login = (username, password) => dispatch => {
	dispatch(requestLogin());
	return (
		fetch(`${API_BASE_URL}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(({ authToken }) => storeToken(authToken, dispatch))
		.catch(error => {
			if (error.error) {
				const { status } = error.error;
				const message = status === 401 ? 'Incorrect username or password' : 'Unable to login, please try again';
				dispatch(loginError(message));
			}
		})
	);
};

// asynch logout function to clear both Redux and LocalStorage
export const logout = () => dispatch => {
	dispatch(clearToken());
	localStorage.removeItem('authToken');
};