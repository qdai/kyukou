import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App admin={false} />, document.querySelector('#app'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(err => {
    console.error(err); // eslint-disable-line no-console
  });
}
