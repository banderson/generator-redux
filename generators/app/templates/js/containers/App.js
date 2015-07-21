import React from 'react';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from '../reducers/index';

import Home from '../components/Home';

const store = createStore(combineReducers(reducers));

export default React.createClass({
  render() {
    return (
      <Provider store={store}>
        {() => <Home /> }
      </Provider>
    );
  }
});
