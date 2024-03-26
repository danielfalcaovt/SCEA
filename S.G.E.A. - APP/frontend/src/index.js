import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/styles.css";
import "./styles/error/ErrorPage.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
