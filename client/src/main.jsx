import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux';
import store from '../src/redux/store'
import axios from 'axios';
import {BrowserRouter as Router} from 'react-router-dom';
axios.defaults.baseURL = 'http://localhost:3001';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  </Router>
)
