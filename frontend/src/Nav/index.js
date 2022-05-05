import React from 'react';
import { NavLink } from 'react-router-dom';

import './nav.css'

const Nav = () => {
  const assignLinkClass = ({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link';

  return (
    <nav className="nav">
      <div className="nav-link-container">
        <NavLink to='movies' className={assignLinkClass}>Movies</NavLink>
        <NavLink to='shows' className={assignLinkClass}>Shows</NavLink>
      </div>
    </nav>
  );
};

export default Nav;