import React from 'react';

let App;
if (__DEV__) {
  App = require('./containers/AppWithDevTools');
} else {
  App = require('./containers/App');
}

React.render(<App />, document.getElementById('main'));
