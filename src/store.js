import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

// Local storage
import { loadAuthToken } from './local-storage';

// Reducers
import authReducer from './reducers/authReducer';
import profileReducer from './reducers/profileReducer';
import characterReducer from './reducers/characterReducer';
import searchReducer from './reducers/searchReducer';
import comicsReducer from './reducers/comicsReducer';

// Actions
import { setAuthToken, refreshAuthToken } from './actions/authActions';

const rootReducer = combineReducers({
  auth: authReducer,
  profile : profileReducer,
  form: formReducer,
  searchTerm: searchReducer,
  characters: characterReducer,
  comics: comicsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer, 
  composeEnhancers(
    applyMiddleware(thunk)
  ));

// Hydrate the authToken from localStorage if it exists
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;