import React from 'react';
import { AuthProvider } from './features/auth';
import { AppRouter } from './routes';
import "./App.css";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
