import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './store/store.js';
const clerkKey = 'pk_test_aW1tZW5zZS1tb2xseS00OC5jbGVyay5hY2NvdW50cy5kZXYk';
import { ClerkProvider } from '@clerk/clerk-react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkKey}>

    <Provider store={store}>
      <App />
    </Provider>

    </ClerkProvider>

  </React.StrictMode>,
)
