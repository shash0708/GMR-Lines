import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
    {/* Navigation Links Section */}
    <div className="nav-container">

    <a className="active" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path d="M240,64V192a16,16,0,0,1-16,16H160a24,24,0,0,0-24,24,8,8,0,0,1-16,0,24,24,0,0,0-24-24H32a16,16,0,0,1-16-16V64A16,16,0,0,1,32,48H88a32,32,0,0,1,32,32v88a8,8,0,0,0,16,0V80a32,32,0,0,1,32-32h56A16,16,0,0,1,240,64Z" />
        </svg>
        <p>Logs</p>
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
</svg>


      <a className="active" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path d="M240,64V192a16,16,0,0,1-16,16H160a24,24,0,0,0-24,24,8,8,0,0,1-16,0,24,24,0,0,0-24-24H32a16,16,0,0,1-16-16V64A16,16,0,0,1,32,48H88a32,32,0,0,1,32,32v88a8,8,0,0,0,16,0V80a32,32,0,0,1,32-32h56A16,16,0,0,1,240,64Z" />
        </svg>
        <p>Logs</p>
      </a>
  
      <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z" />
        </svg>
        <p>Reports</p>
      </a>
  
      <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
        </svg>
        <p>Profile</p>
      </a>
    </div>
  </footer>
  
  );
};

export default Footer;
