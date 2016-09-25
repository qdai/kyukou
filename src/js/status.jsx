import { applyMiddleware, createStore } from 'redux';
import reducer, { initialState } from './status/reducer';
import App from './status/components/app.jsx';
import { Provider } from 'react-redux';
import React from 'react';
import { apiMiddleware } from 'redux-api-middleware';
import loadLogs from './status/utils/load-logs';
import { render } from 'react-dom';

const store = createStore(reducer, initialState, applyMiddleware(apiMiddleware));

loadLogs(store.dispatch);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);
