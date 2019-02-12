import { API_BASE_URL } from '../config';
import { login } from './authActions';
import { SubmissionError } from 'redux-form';
import { normalizeResponseErrors } from './utils';

export const createUser = (username, email, password) => dispatch => {
  return fetch(`${API_BASE_URL}/api/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      username,
      email,
      password
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => {
    console.log('response inside createUser async:', res)
    dispatch(login(username, password))
  })
  .catch(error => {
    console.error(error);
    const { message } = error;
    return Promise.reject(new SubmissionError({_error: message}));
  });
};

// // ---CREATE ---------------------------------------------------------------------------------
// export const REGISTER_NEW_USER = 'REGISTER_NEW_USER',
//   registerNewUser = (id, username, email) => ({
//     type: REGISTER_NEW_USER,
//     id,
//     username,  
//     email
//   });

// export const registerNewUserHandler = (username, password, email) => dispatch => {
//   const newUser = { email, username, password };

//   return fetch(`${API_BASE_URL}/api/user`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(newUser)
//   })
//   .then(res => res.json())
//   .then(json => dispatch(registerNewUser(json)))
//   .then(() => dispatch(loginUserHandler(username, password)))
//   .catch(err => console.error(err));
// }

// // ---LOGIN ---------------------------------------------------------------------------------
// export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
//   loginUserSuccess = (username, token) => ({
//     type: LOGIN_USER_SUCCESS,
//     username,
//     token
//   });

// // ---LOGIN ERROR ---------------------------------------------------------------------------------
// export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE',
//   loginUserFailure = (error) => ({
//     type: LOGIN_USER_FAILURE,
//     error
//   });

// // ---LOGIN ASYNC ---------------------------------------------------------------------------------
// export const loginUserHandler = (history, username, password) => dispatch => {
//   const user = {
//     username,
//     password
//   };

//   const myHeaders = new Headers();

//   myHeaders.append('Content-Type', 'application/json');
//   myHeaders.append('Accept', 'application/json');

//   return fetch(`${API_BASE_URL}/api/login`, {
//     method: 'POST',
//     headers: myHeaders,
//     mode: 'cors',
//     body: JSON.stringify(user)
//   })
//   .then(res => {
//     if (res.status !== 200) {
//       throw new Error ('Username or password is incorrect!');
//     }
//     return res.json()
//   })
//   .then(({ authToken }) => dispatch(loginUserSuccess(username, authToken)))
//   .then(() => history.push('/UserControls')) 
//   .catch(err => {
//     dispatch(loginUserFailure(err.message));
//   });
// }

// // ---LOGOUT ---------------------------------------------------------------------------------
// export const LOGOUT_USER = 'LOGOUT_USER',
//   logoutUser = () => ({
//     type: LOGOUT_USER
//   });