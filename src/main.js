import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import makeRoutes from './routes';
import Root from './containers/Root';
import configureStore from './redux/configureStore';
import configureXhrClient from './redux/utils/createXhrClient';

window.__CLIENT__ = true;
window.__SERVER__ = false;

// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the key "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.__INITIAL_STATE__;
const xhrClient = configureXhrClient();
const store = configureStore(browserHistory, xhrClient, initialState);
const history = syncHistoryWithStore(browserHistory, store);

// Now that we have the Redux store, we can create our routes. We provide
// the store to the route definitions so that routes have access to it for
// hooks such as `onEnter`.
const routes = makeRoutes(store);

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
