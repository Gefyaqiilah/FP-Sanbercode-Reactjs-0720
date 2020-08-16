import React from 'react';
import './App.css';

import Main from './layouts/Main';

import { MoviesProvider } from './context/MoviesContext';
import { UserProvider } from './context/UserContext';
function App() {
  return (
    <MoviesProvider>
      <UserProvider>
        <Main />
      </UserProvider>
    </MoviesProvider>
  );
}

export default App;