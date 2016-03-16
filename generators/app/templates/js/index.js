import React from 'react';
import ReactDOM from 'react-dom';
import RenderDevTools from './utils/devTools';
import App from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById('main'));
ReactDOM.render(<RenderDevTools store={store} />, document.getElementById('debug'));
