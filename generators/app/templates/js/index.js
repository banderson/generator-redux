import React from 'react';

// TODO: better way to do this?
const App = require(
  __DEV__
  ? './containers/AppWithDevTools'
  : './containers/App'
);

React.render(<App />, document.getElementById('main'));
