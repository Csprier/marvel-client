import jwtDecode from 'jwt-decode';
import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { saveAuthToken, clearAuthToken } from '../local-storage';

// ===========================================================================
// AUTH ACTIONS ===============
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN',
	setAuthToken = authToken => ({
		type: SET_AUTH_TOKEN,
		authToken
	})

// Removes authToken & user info from Redux state
export const CLEAR_AUTH = 'CLEAR_AUTH',
  clearAuth = () => {
    return {
      type: CLEAR_AUTH
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
export const storeAuthInfo = (authToken, dispatch) => {
	const decodedToken = jwtDecode(authToken);
	dispatch(setAuthToken(authToken));
	dispatch(authSuccess(decodedToken.user));
	saveAuthToken(authToken);
};

export const refreshAuthToken = () => (dispatch, getState) => {
	dispatch(authRequest());
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/api/auth/refresh`, {
		method: 'POST',
		headers: {
			// provide the existing token as credentials to get a new one
			Authorization: `Bearer: ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(({ authToken }) => {
		console.log('refreshAuthToken', authToken);
		storeAuthInfo(authToken, dispatch)
	})
	.catch(err => {
		// We couldn't get a refresh token because our current credentials
		// are invalid or expired, so clear them and sign us out
		// dispatch(authError(err.message));
		console.log('RAT ERROR: ', err)
		dispatch(clearAuth());
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
			user,
			loading: false
    };
  };  

// Set loading to false & add error to redux state
export const LOGIN_ERROR = 'LOGIN_ERROR',
  loginError = error => {
    return {
			type: LOGIN_ERROR,
			error,
			loading: false
    };
  };

// Asynch login call
export const login = (username, password) => dispatch => {
	dispatch(requestLogin());
	dispatch(authRequest());
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
		.then(({ authToken }) => {
			// console.log('login AuthToken, storingAuthInfo now!');
			storeAuthInfo(authToken, dispatch)
		})
		.catch(error => {
			console.log('login.catch(error):', error);
			const { code } = error;
			const message = (code === 401) 
				? 'Incorrect username or password'
				: 'Unable to login, please try again';
			dispatch(authError(error));
			return Promise.reject(
				new SubmissionError({
					_error: message
				})
			)
			

		}) // END CATCH
	);
};

// asynch logout function to clear both Redux and LocalStorage
export const logout = () => dispatch => {
	dispatch(clearAuth());
	localStorage.removeItem('authToken');
};