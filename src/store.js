import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import characterReducer from './reducers/characterReducer';
import searchReducer from './reducers/searchReducer';

const rootReducer = combineReducers({
  // form: formReducer,
  // auth: authReducer,
  form: formReducer,
  searchTerm: searchReducer,
  characters: characterReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer, 
  composeEnhancers(
    applyMiddleware(thunk)
  ));

export default store;