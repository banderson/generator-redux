import React from 'react';
import {createStore as originalCreateStore} from 'redux';

export let createStore = originalCreateStore;

// override createStore to compose devtools functionality in DEV
if (__DEV__) {
  let thunk = require('redux-thunk');
  let {applyMiddleware, compose} = require('redux');
  let {devTools, persistState} = require('redux-devtools');

  createStore = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    originalCreateStore
  );
}

export function renderDevTools(store) {
  if (__DEV__) {
    let {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react');
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }

  return null;
}
