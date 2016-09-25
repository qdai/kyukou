import { applyMiddleware, createStore } from 'redux';
import reducer, { initialState } from './admin/reducer';
import App from './admin/components/app.jsx';
import { Provider } from 'react-redux';
import React from 'react';
import { apiMiddleware } from 'redux-api-middleware';
import { loadEvents } from './admin/actions';
import { render } from 'react-dom';

const store = createStore(reducer, initialState, applyMiddleware(apiMiddleware));

store.dispatch(loadEvents());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);
