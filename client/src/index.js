import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import USState from './Context/USState';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <USState>
      <App />
    </USState>
  </React.StrictMode>
);
