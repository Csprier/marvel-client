import { API_BASE_URL } from '../config';
import { login } from './authActions';
import { SubmissionError } from 'redux-form'; // For any errors that slip through client-side validation
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
  .then(() => dispatch(login(username, password)))
  .catch(error => {
    const { reason, message, location } = error;
    if (reason === 'ValidationError') {
      // Convert ValidationErrors into SubmissionErrors for redux-form
      return Promise.reject(
        new SubmissionError({
          [location]: message
        })
      );
    }
    console.log(error);
  });
};

// Get form errors into state
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR',
  createUserError = error => {
    return {
      type: CREATE_USER_ERROR,
      error
    }
  }