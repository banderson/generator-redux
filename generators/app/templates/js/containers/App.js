import React from 'react';
import MainApp from './MainApp';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from '../reducers/index';

// Devtools
import thunk from 'redux-thunk';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

const store = finalCreateStore(combineReducers(reducers));

export default React.createClass({
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <MainApp /> }
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store}
                    monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
});
