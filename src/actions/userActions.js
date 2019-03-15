import { API_BASE_URL } from '../config';
import { login, loginError } from './authActions';
import { normalizeResponseErrors } from './utils';


export const createUser = (username, email, password) => dispatch => {
  return fetch(`${API_BASE_URL}/user`, {
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
    const { message } = error;
    dispatch(loginError(message));
  });
};

// // Get form errors into state
// export const CREATE_USER_ERROR = 'CREATE_USER_ERROR',
//   createUserError = error => {
//     return {
//       type: CREATE_USER_ERROR,
//       error
//     }
//   }