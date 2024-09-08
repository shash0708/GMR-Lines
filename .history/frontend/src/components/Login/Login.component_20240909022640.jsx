import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import URL from '../config';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh; /* Ensure it covers the full height of the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white; /* Make text white */
  background: url('assets/home.jpg') no-repeat center center fixed;
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

const Login = (props) => {
  useDocumentTitle('Login'); // Set the document title for this page

  const [credentials, setCredentials] = useState({ AME: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${URL}/api/login`, {
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
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login to Continue</Title>
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </StyledForm>
      </FormWrapper>
    </Container>
  );
}

export default Login;
