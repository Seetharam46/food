import React from 'react';
import './Navbar.css'; // ✅ Correct path now

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">QuickBite</div>
      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Login</a></li>
        <li><a href="#">Register</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
