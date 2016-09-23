import reducer, { initialState } from './calendar/reducer';
import App from './calendar/components/app.jsx';
import { Provider } from 'react-redux';
import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';

const store = createStore(reducer, initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);
