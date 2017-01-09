import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import reducer, { initialState } from './app/reducer';
import App from './app/components/app.jsx';
import { Provider } from 'react-redux';
import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { loadEventsRequest } from './app/actions';
import { render } from 'react-dom';
import sagas from './app/sagas';
import { version } from './utils/constant';

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(autoRehydrate(), applyMiddleware(sagaMiddleware));
const store = createStore(reducer, initialState, enhancer);

sagaMiddleware.run(sagas);
store.dispatch(loadEventsRequest());

persistStore(store, {
  keyPrefix: `kyukou-v${version.slice(0, version.indexOf('.'))}`,
  whitelist: ['selectedAbouts', 'selectedDepartments']
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(err => {
    console.error(err); // eslint-disable-line no-console
  });
}
