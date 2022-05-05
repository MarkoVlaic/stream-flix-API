import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Movies from './Movies';
import Shows from './Shows';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route 
          index
          element={
            <h1 style={{ color: 'var(--color-grey)', fontSize: '4rem', textAlign:'center' }}>A large movie and TV-show database!</h1>
          }
        />
        <Route path="movies" element={<Movies />} />
        <Route path="shows" element={<Shows />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
