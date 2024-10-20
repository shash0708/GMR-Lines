import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import URL from '../config'; // Make sure this is the correct path
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh; /* Ensure it covers the full height of the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white; /* Make text white */
  background: url('assets/signup-background.jpg') no-repeat center center fixed;
  background-size: cover;
`;

const FormWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.7); /* Dark background with transparency */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  .form-control {
    margin-bottom: 15px;
    background: rgba(255, 255, 255, 0.2); /* Light transparent background for input */
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
  }

  .form-control:focus {
    outline: none;
    box-shadow: 0 0 5px #fff;
  }

  label {
    text-align: left;
    display: block;
    color: white;
    margin-bottom: 5px;
  }

  button {
    width: 100%;
    background-color: blue;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darkblue;
    }
  }
`;

const Alert = styled.div`
  background-color: #ff4c4c;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const Signup = (props) => {
  useDocumentTitle('Sign In'); // Set the document title for this page

  const [credentials, setCredentials] = useState({ AME: "", password: "", cpassword: "" });
  const [error, setError] = useState(null); // State to store error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { AME,password, cpassword } = credentials;

    // Check if passwords match
    if (password !== cpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${URL}/api/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ AME, password })
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem('AME', AME);  // Save AMENO
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
    <Container>
      <FormWrapper>
        <Title>Signup to Continue</Title>
        {error && <Alert role="alert">{error}</Alert>} {/* Error display */}
        <StyledForm onSubmit={handleSubmit}>
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
        </StyledForm>
      </FormWrapper>
    </Container>
  );
};

export default Signup;
