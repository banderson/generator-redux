import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {devTools, persistState} from 'redux-devtools';
import * as reducers from '../reducers/index';
import { routerReducer } from 'react-router-redux'

let createStoreWithMiddleware;

// Configure the dev tools when in DEV mode
if (__DEV__) {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
}

const rootReducer = combineReducers({...reducers, routing: routerReducer});

export default (initialState) => {
  return createStoreWithMiddleware(rootReducer, initialState);
}
