export const loadAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
  try {
    // .setItem method saves key/value pairs in the local storage in the browser, both as strings.
    // .setItem(key, value);
    localStorage.setItem('authToken', authToken);
  } catch(e) {}
};

export const clearAuthToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch(e) {}
};