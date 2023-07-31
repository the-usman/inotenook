import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AlertState from './context/Alertcontext/alertState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertState>
        <App />
      </AlertState>
    </BrowserRouter>
  </React.StrictMode>
);
