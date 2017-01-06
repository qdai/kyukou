import { applyMiddleware, createStore } from 'redux';
import reducer, { initialState } from './status/reducer';
import App from './status/components/app.jsx';
import { Provider } from 'react-redux';
import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { loadLogsRequest } from './status/actions';
import { render } from 'react-dom';
import sagas from './status/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);
store.dispatch(loadLogsRequest());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);
