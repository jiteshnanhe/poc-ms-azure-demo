import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca = new PublicClientApplication({
  auth: {
    clientId: 'd8709f2a-a693-42dd-a504-5dd27d7f1de0',
    authority: 'https://login.microsoftonline.com/a3b4cbab-a447-4530-8ed7-2c77e701be99',
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
