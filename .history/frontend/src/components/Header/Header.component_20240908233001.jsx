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
        <a href="#home"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-houses" viewBox="0 0 16 16">
  <path d="M5.793 1a1 1 0 0 1 1.414 0l.647.646a.5.5 0 1 1-.708.708L6.5 1.707 2 6.207V12.5a.5.5 0 0 0 .5.5.5.5 0 0 1 0 1A1.5 1.5 0 0 1 1 12.5V7.207l-.146.147a.5.5 0 0 1-.708-.708zm3 1a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708zm.707.707L5 7.207V13.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.207z"/>
</svg></a>
        <a href="#about">Past Entries</a>
        <a href="#services">Services</a>
        {/* <a href="#contact">Contact</a> */}
      </div>
    </div>
  );
};

export default Navbar;
