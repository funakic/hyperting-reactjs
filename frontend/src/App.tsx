import React from 'react';

import { AuthProvider } from './contexts/AuthContext';

import Routes from './routes';

import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes />
    </AuthProvider>
  );
}