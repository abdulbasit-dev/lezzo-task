import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import allReducers from './redux/reducers/reducers';
import {createStore} from 'redux';
// The provider provides the store for all the components
import {Provider} from 'react-redux';

// Store: Globalized States
const myStore = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
