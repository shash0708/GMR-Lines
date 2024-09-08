import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Clear the previous timeout if it exists
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Set a timeout to update the Navbar visibility after scrolling stops
    const newScrollTimeout = setTimeout(() => {
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setShowNavbar(false);
      } else if (currentScrollTop < lastScrollTop) {
        // Scrolling up
        setShowNavbar(true);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    }, 100); // Delay in milliseconds to wait before hiding/showing Navbar

    setScrollTimeout(newScrollTimeout);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout, lastScrollTop]);

  return (
    <div className={`navbar ${showNavbar ? 'show' : 'hide'}`}>
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
