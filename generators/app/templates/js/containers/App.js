import React from 'react';
import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {createStore, renderDevTools} from '../utils/devTools';

import * as reducers from '../reducers/index';
import Home from '../components/Home';

const store = createStore(combineReducers(reducers));

export default React.createClass({
  render() {
    return (
      <div>

        {/* <Home /> is your app entry point */}
        <Provider store={store}>
          {() => <Home /> }
        </Provider>

        {/* only renders when running in DEV mode */
          renderDevTools(store)
        }
      </div>
    );
  }
});
