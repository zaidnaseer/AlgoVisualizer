import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/components.css';

import { ClerkProvider } from '@clerk/clerk-react';

// Use the publishable key from your .env.local
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Debug log to check if the env variable is loaded
console.log("Clerk Publishable Key:", clerkPubKey);

ReactDOM.render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <App />
  </ClerkProvider>,
  document.getElementById('root')
);

