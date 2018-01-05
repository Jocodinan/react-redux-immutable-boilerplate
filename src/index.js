import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import registerServiceWorker from './registerServiceWorker';

import Router from './router.js';

ReactDOM.render(
  <Provider store={ store }>
    <Router />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();