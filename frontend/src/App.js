import React from 'react';
import { Outlet } from 'react-router';

import Nav from './Nav';
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
