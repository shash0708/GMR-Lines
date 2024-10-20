import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  let navigate = useNavigate();
  let location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    const newScrollTimeout = setTimeout(() => {
      if (currentScrollTop > lastScrollTop) {
        setShowNavbar(false);
      } else if (currentScrollTop < lastScrollTop) {
        setShowNavbar(true);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    }, 100);

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
        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-houses" viewBox="0 0 16 16">
            <path d="M5.793 1a1 1 0 0 1 1.414 0l.647.646a.5.5 0 1 1-.708.708L6.5 1.707 2 6.207V12.5a.5.5 0 0 0 .5.5.5.5 0 0 1 0 1A1.5 1.5 0 0 1 1 12.5V7.207l-.146.147a.5.5 0 0 1-.708-.708zm3 1a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708zm.707.707L5 7.207V13.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.207z"/>
          </svg>
          <span>Home</span>
        </Link>
        <Link className={`nav-link ${location.pathname === "/past-records" ? "active" : ""}`} to="/past-records">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-stack-overflow" viewBox="0 0 16 16">
            <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282z"/>
            <path d="M3.857 13.145h7.137v-1.428H3.857zM10.254 0 9.108.852l4.26 5.727 1.146-.852zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468z"/>
          </svg>
          <span>Past Records</span>
        </Link>
        <Link className={`nav-link ${location.pathname === "/flight-search" ? "active" : ""}`} to="/flight-search">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-airplane-engines" viewBox="0 0 16 16">
            <path d="M0 8.078l8 4.78 8-4.78L8 3.298 0 8.078zm8-6.672L16 8.078 8 12.09 0 8.078 8 1.406zm0 4.365l4.924 2.857L8 12.09 3.076 8.628 8 5.771z"/>
          </svg>
          <span>Flight Search</span>
        </Link>
        <Link className={`nav-link ${location.pathname === "/flight-stats" ? "active" : ""}`} to="/flight-stats">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-bar-chart-line" viewBox="0 0 16 16">
            <path d="M1 15h14V1H1v14zM0 0v16h16V0H0zM2 2h12v12H2V2zM4 4v8h2V4H4zm4 0v8h2V4H8zm4 0v8h2V4h-2z"/>
          </svg>
          <span>Flight Stats</span>
        </Link>
        {!localStorage.getItem('token') ? (
          <form className="d-flex">
            <Link role="button" to="/login">Login</Link>
            <Link role="button" to="/signup">Signup</Link>
          </form>
        ) : (
          <Link onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-person-square" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
            </svg>
            <span>Logout</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
