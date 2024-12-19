import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';  // Import NavLink from react-router-dom
import './Footer.css';
import { ThemeContext } from '../../context/ThemeChange.js';

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer className="footer">
      {/* Navigation Links Section */}
      <div className="nav-container">

        {/* Home Link */}
        <NavLink 
          className="nav-link" 
          to="/" 
          activeClassName="active"
          exact
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
</svg>
          <p>Home</p>
        </NavLink>

        {/* Logs Link */}
        <NavLink 
          className="nav-link" 
          to="/past-records" 
          activeClassName="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path d="M240,64V192a16,16,0,0,1-16,16H160a24,24,0,0,0-24,24,8,8,0,0,1-16,0,24,24,0,0,0-24-24H32a16,16,0,0,1-16-16V64A16,16,0,0,1,32,48H88a32,32,0,0,1,32,32v88a8,8,0,0,0,16,0V80a32,32,0,0,1,32-32h56A16,16,0,0,1,240,64Z" />
          </svg>
          <p>Logs</p>
        </NavLink>

        {/* Reports Link */}
        {/* <NavLink 
          className="nav-link" 
          to="/reports" 
          activeClassName="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z" />
          </svg>
          <p>Reports</p>
        </NavLink> */}

        {/* Profile Link */}
        <NavLink 
          className="nav-link" 
          to="/profile" 
          activeClassName="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
          </svg>
          <p>Profile</p>
        </NavLink>

      </div>
    </footer>
  );
};

export default Footer;
