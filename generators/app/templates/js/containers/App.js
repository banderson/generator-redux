import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import Home from '../components/Home';
import Page from '../components/Page'

export default ({store}) => {

  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <main>
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Home}/>
          <Route path="page" component={Page}/>
        </Router>
      </Provider>
    </main>
  )
};

