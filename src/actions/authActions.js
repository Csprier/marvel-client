import jwtDecode from 'jwt-decode';
// import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

// Removes authToken & user info from Redux state
export const CLEAR_TOKEN = 'CLEAR_TOKEN',
  clearToken = () => {
    return {
      type: CLEAR_TOKEN
    };
  };

// Set loading to true
export const REQUEST_LOGIN = 'REQUEST_LOGIN',
  requestLogin = () => {
    return {
      type: REQUEST_LOGIN
    };
  };

// Set loading to false & add user to Redux state
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  loginSuccess = user => {
    return {
      type: LOGIN_SUCCESS,
      user
    };
  };  

// Set loading to false & add error to redux state
export const LOGIN_ERROR = 'LOGIN_ERROR',
  loginError = error => {
    return {
      type: LOGIN_ERROR,
      error
    };
  };

//Store in localStorage & decompose into state
export const storeToken = (token, dispatch) => {
	const decodedToken = jwtDecode(token);
	// set local storage BEFORE sending decoded token to avoid timing errors
	localStorage.setItem('authToken', token);
	dispatch(loginSuccess(decodedToken.user));
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