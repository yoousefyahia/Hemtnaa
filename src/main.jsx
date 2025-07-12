import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.sass';
import App from './App.jsx';
import { UserProvider } from './child-ui/components/UserContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
