import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import reducer, { initialState } from './app/reducer';
import App from './app/components/app.jsx';
import { Provider } from 'react-redux';
import React from 'react';
import { apiMiddleware } from 'redux-api-middleware';
import { loadEvents } from './app/actions';
import { render } from 'react-dom';
import { version } from './utils/constant';

const enhancer = compose(autoRehydrate(), applyMiddleware(apiMiddleware));
const store = createStore(reducer, initialState, enhancer);

persistStore(store, {
  keyPrefix: `kyukou-v${version.slice(0, version.indexOf('.'))}`,
  whitelist: ['selectedAbouts', 'selectedDepartments']
});

store.dispatch(loadEvents());

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
