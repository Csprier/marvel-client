import { API_BASE_URL } from '../config';
import { logout } from './authActions';
import { normalizeResponseErrors } from './utils';

// Request all admin user data, set loading to true
export const REQUEST_PROFILE = 'REQUEST_PROFILE',
  requestProfile = () => {
	  return {
		  type: REQUEST_PROFILE
	  };
	};
export const PROFILE_EDIT = 'PROFILE_EDIT',
	editMode = () => { // engage edit state change
		return {
			type: PROFILE_EDIT
		};
	};

// Set loading to false and load profile info into the state
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS',
  profileSuccess = data => {
	  return {
		  type: PROFILE_SUCCESS,
		  data
	  };
  };

//Set loading to flase and set error.message
export const PROFILE_ERROR = 'PROFILE_ERROR',
  profileError = error => {
    return {
      type: PROFILE_ERROR,
      error
    };
  };

// **************  GET PROFILE INFO  ************** //
// Must pass userId in order to use for url
export const fetchProfile = userId => dispatch => {
	console.log('Engage fetchProfile');
	const token = localStorage.getItem('authToken');
	dispatch(requestProfile());
	return fetch(`${API_BASE_URL}/user/${userId}`, {
		method : 'GET',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(data => {
			dispatch(profileSuccess(data));
		})
		.catch(error => {
			dispatch(profileError(error.message));
		});
};

// **************  EDIT PROFILE INFO  ************** //
export const editProfile = (userId, updatedProfile) => dispatch => {
	console.log('Engage Profile Edit');
	const token = localStorage.getItem('authToken');
	dispatch(requestProfile());
	return fetch(`${API_BASE_URL}/user/${userId}`, {
		method : 'PUT',
		headers: {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		},
		body : JSON.stringify(updatedProfile)})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(() => {
			dispatch(fetchProfile(userId));
		})
		.catch(error => {
			dispatch(profileError(error.message));
    });
};

// **************  DELETE PROFILE INFO  ************** //
export const deleteProfile = (userId, history) => dispatch => {
	const token = localStorage.getItem('authToken');
	dispatch(requestProfile());
	return fetch(`${API_BASE_URL}/user/${userId}`, {
		method : 'DELETE',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		}
	})
  .then(() => dispatch(logout(history)))
  .catch((error) => {
    return dispatch(profileError(error.message));
  });
};