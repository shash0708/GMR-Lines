import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import URL from '../config'; // Make sure this is the correct path

const Signup = (props) => {
  useDocumentTitle('Sign In'); // Set the document title for this page

  const [credentials, setCredentials] = useState({ AME: "", password: "", cpassword: "" });
  const [error, setError] = useState(null); // State to store error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { AME, password, cpassword } = credentials;

    // Check if passwords match
    if (password !== cpassword) {
      setError("Passwords do not match");
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
        setError("Signup failed. Please try again."); // Set error message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(null); // Clear error message on input change
  };

  return (
    <div className='container'>
      <h1>Signup to Continue to iNoteBook</h1>
      {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Error display */}
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
