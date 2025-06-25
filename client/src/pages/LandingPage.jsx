import React from 'react';
import Navbar from '../components/Navbar'; // ✅ Corrected path
import '../styles/LandingPage.css';       // ✅ Corrected path

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <header className="hero-section">
        <h1>Welcome to QuickBite</h1>
        <p>Your favorite meals delivered fast & fresh</p>
        <a href="#" className="cta-button">Order Now</a>
      </header>
    </div>
  );
};

export default LandingPage;
