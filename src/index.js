import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca = new PublicClientApplication({
  auth: {
      clientId: '51ab0f37-0dfe-48f9-8134-1154165aa03c',
      authority: 'https://WSDHCLN.b2clogin.com/WSDHCLN.onmicrosoft.com/609d960e-dd91-4b9c-97a9-594f71108127',
      redirectUri: '/',
  },
  cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
  },
  system: {
      loggerOptions: {
          loggerCallback: (level, message, containsPII) => {
              console.log(message)
          },
          logLevel: "Info",
      }

  }
});

pca.addEventCallback(event => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
      console.log(event);
      pca.setActiveAccount(event.payload.account);
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App msalInstance={pca}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
