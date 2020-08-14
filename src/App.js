import React from 'react';
import './App.css';

import Main from './layouts/Main';

import { MoviesProvider } from './context/MoviesContext';
function App() {
  return (
    <MoviesProvider>
      <Main />
    </MoviesProvider>
  );
}

export default App;