import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import 
const Login = (props) => {
  useDocumentTitle('Login'); // Set the document title for this page

  const [credentials, setCredentials] = useState({ AME: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ AME: credentials.AME, password: credentials.password })
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);   
        alert("Logged in Successfully");
        navigate('/');
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("There was an error with the login request:", error);
      alert("An error occurred. Please try again later.");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className='container'>
      <h1>Login to Continue to iNoteBook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="AME" className="form-label">AMEI NUMBER</label>
          <input
            type="text"
            className="form-control"
            name="AME"
            id="AME"
            value={credentials.AME}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Login;
