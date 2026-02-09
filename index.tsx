import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Polyfill process.env for the provided API key to ensure immediate functionality
// In a real production app, this would be handled by a build process/server.
(window as any).process = {
  env: {
    API_KEY: 'AIzaSyByrWCEqANBPvyinUQh6VJ8MwAhFi73As4'
  }
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);