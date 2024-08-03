import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
const  Navbar = ()=> {
  let navigate = useNavigate();

   const hangleLogout =()=>{
      localStorage.removeItem('token');
      navigate('/login')
   }

    let location = useLocation();
    useEffect(()=>{
        console.log(location.pathname);

    },[location])
  return (
    <div>
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">GMR Log Book</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname ==="/"  ? "active": ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname ==="/past-records"  ? "active": ""}`} to="/past-records">past-records</Link>
        </li>
        
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" >
      <Link role="button" class="btn btn-primary mx-2" to="/login">Login</Link>
      <Link role="button" class="btn btn-primary mx-2" to="/signup">Signup</Link>  
      </form>: <button onClick={hangleLogout} className='btn btn-primary'>Logout</button>}
    </div>
  </div>
</nav>
      </div>
    </div>
  )
}

export default Navbar