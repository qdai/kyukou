import { applyMiddleware, createStore } from 'redux';
import reducer, { initialState } from './admin/reducer';
import App from './admin/components/app.jsx';
import { Provider } from 'react-redux';
import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { loadEventsRequest } from './admin/actions';
import { render } from 'react-dom';
import sagas from './admin/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);
store.dispatch(loadEventsRequest());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);
