import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';
import reportWebVitals from "./reportWebVitals";
import { store } from './redux/store';

const host = window.location.host;
axios.defaults.baseURL = window.location.protocol + "//" + host;
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();