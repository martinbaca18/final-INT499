import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { register as registerServiceWorker } from './serviceWorkerRegistration'; // Import the service worker registration

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Register the service worker for offline capabilities
registerServiceWorker();
