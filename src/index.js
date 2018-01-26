import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider }  from 'react-redux';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import registerServiceWorker from './registerServiceWorker';
import allReducers from './state/reducers.js';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './container/App';

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(allReducers, applyMiddleware(middleware));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
