import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AuthProvider from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
