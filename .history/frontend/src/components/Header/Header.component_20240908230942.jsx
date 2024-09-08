import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  let lastScrollTop = 0;

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      setShowNavbar(false);
    } else {
      // Scrolling up
      setShowNavbar(true);
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar ${showNavbar ? 'show' : 'hide'}`}>
      {/* <div className="navbar-content">
        <button>Top</button>
        <button>Bottom</button>
        <button>Left</button>
        <button>Right</button>
      </div> */}
      <div className="navbar-items">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        {/* <a href="#contact">Contact</a> */}
      </div>
    </div>
  );
};

export default Navbar;
