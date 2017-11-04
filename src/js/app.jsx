import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import reducer, { initialState } from './app/reducer';
import App from './app/components/app.jsx';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import createSagaMiddleware from 'redux-saga';
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4';
import { loadEventsRequest } from './app/actions';
import { render } from 'react-dom';
import sagas from './app/sagas';
import storage from 'redux-persist/lib/storage';
import { version } from './utils/constant';

const persistConfigV4 = {
  keyPrefix: `kyukou-v${version.slice(0, version.indexOf('.'))}`,
  whitelist: ['selectedAbouts', 'selectedDepartments']
};
const persistConfig = {
  getStoredState: getStoredStateMigrateV4(persistConfigV4),
  key: 'root',
  storage,
  version: 1,
  whitelist: ['selectedAbouts', 'selectedDepartments']
};
const persistedReducer = persistReducer(persistConfig, reducer);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);
store.dispatch(loadEventsRequest());

const persistor = persistStore(store);

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('content')
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(err => {
    console.error(err); // eslint-disable-line no-console
  });
}
