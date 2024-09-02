import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import URL
const Signup = (props) => {
  useDocumentTitle('Sign In'); // Set the document title for this page

  const [credentials, setCredentials] = useState({ AME: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { AME, password } = credentials;

    // Check if passwords match
    if (password !== credentials.cpassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${URL}api/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ AME, password })
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        alert("Account Created successfully");
        navigate('/');
      } else {
        console.log("Signup failed");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container'>
      <h1>Signup to Continue to iNoteBook</h1>
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
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
