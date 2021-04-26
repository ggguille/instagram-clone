import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// client side rendered app: React (cra)
  // -> database which is Firebase
  // -> external dependencies React-Loading-Skeleton
  // -> styling Tailwind

// architecture
  // src
    // -> components, 
    // -> constants, 
    // -> context, 
    // -> helpers, 
    // -> lib (firebase here), 
    // -> services (firebase functions)
    // -> styles (tailwind´s folder (app/tailwind))
