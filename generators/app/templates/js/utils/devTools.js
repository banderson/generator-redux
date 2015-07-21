import React from 'react';
import {createStore as originalCreateStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {devTools, persistState} from 'redux-devtools';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';

export let createStore = originalCreateStore;

// override createStore to compose devtools functionality in DEV
if (__DEV__) {
  createStore = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    originalCreateStore
  );
}

export function renderDevTools(store) {
  if (__DEV__) {
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }

  return null;
}
