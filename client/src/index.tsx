import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import WalletConnection from './hoc/WalletConnection';
import ErrorBoundary from './hoc/ErrorBoundary';

import App from './App';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletConnection>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </WalletConnection>
    </BrowserRouter>
  </React.StrictMode>
);
