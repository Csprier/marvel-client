import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import characterReducer from './reducers/characterReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(characterReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));

export default store;