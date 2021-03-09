import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer position='bottom-left' autoClose={5000} />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
