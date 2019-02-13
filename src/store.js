import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import authReducer from './reducers/authReducer';
import characterReducer from './reducers/characterReducer';
import searchReducer from './reducers/searchReducer';
import comicsReducer from './reducers/comicsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
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

export default store;