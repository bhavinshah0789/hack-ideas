import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';

import HackIdeasAPI from './api/HackIdeasAPI';

// Initialize the firebase app
HackIdeasAPI.initializeFirebaseApp();

// Render the hack idea app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
