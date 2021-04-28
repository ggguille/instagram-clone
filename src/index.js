import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Firebase from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';

ReactDOM.render(
  <Firebase.Provider value={{ firebase, FieldValue }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Firebase.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
