import styled from 'styled-components';

export const Card = styled.div`

  
  /* position:absolute; */
  background-color: blue; /* Green background color */
  color: #fff;               /* White text color */
  padding: 10px 20px;       /* Padding inside the button */
  border: none;         
  width:300px;    /* Remove default border */
  border-radius: 5px;   
/* This is crucial for positioning child elements absolutely within it */
  width: 500px;
  height: 10vh; /* Adjust height as needed */
  display: flex;

  align-items: center;
  justify-content: center;
  
  /* Rounded corners */
  font-size: 16px;          /* Font size */
  font-weight: bold;        /* Bold text */
  cursor: pointer;          /* Pointer cursor on hover */

  /* Hover effect */
  &:hover {
    background-color: blue; /* Slightly darker green on hover */
    transform: scale(1.05);    /* Slightly enlarge the button on hover */
  }

  /* Focus effect */
  &:focus {
    outline: none; /* Remove default focus outline */
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2); /* Add a subtle shadow on focus */
  }

  /* Disabled state */
  &:disabled {
    background-color: #a9a9a9; /* Grey background for disabled button */
    cursor: not-allowed;       /* Change cursor to not-allowed */
    opacity: 0.6;              /* Make button slightly transparent */
  }

  /* Small screens responsiveness */
  @media (max-width: 768px) {
    font-size: 14px; /* Smaller font size on small screens */
    padding: 8px 16px; /* Adjust padding on small screens */
  }
`;
