import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import SubredditContextProvider from './context/SubredditContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SubredditContextProvider>
      <App />
    </SubredditContextProvider>
  </StrictMode>
);
