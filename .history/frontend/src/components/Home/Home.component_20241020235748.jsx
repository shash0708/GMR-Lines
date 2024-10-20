import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import URL from "../config";
import "./Home.css";
import Footer from "../Footer/Footer.component";
import { Button } from "@mui/material";
import styled from "styled-components";

// Styled Components
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap; 
  justify-content: center; // Center cards horizontally

`;

const Card = styled.div`
  display: flex;
  flex-direction: column; 
  border: 2px solid black;
  background-color: white;
  width: 200px; 
  height: 200px; 
  gap: 20px;
  margin: 10px; 

  @media (min-width: 768px) {
    flex: 1 1 auto; 
    max-width: 300px; 
  }

  @media (max-width: 767px) {
    flex: 1 1 100%; 
  }
`;

const cardData = [
  { Id: 1, text: "This is the text for card 1." },
  { Id: 2, text: "This is the text for card 2." },
  { Id: 3, text: "This is the text for card 3." },
];

const Home = () => {
  const navigate = useNavigate();
  useDocumentTitle("Aviation Logbook");

  const [ameNumber, setAmeNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmeNumber = async () => {
      try {
        const response = await fetch(`${URL}/api/getuser`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAmeNumber(data.AME);
      } catch (error) {
        console.error("Error fetching AME number:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAmeNumber();
  }, []);

  return (
    <div className="Home">
      <header className="hero-section">
        <h1>AirCrew</h1>
        <img src="assests/bg.jpg" alt="AirCrew logo" className="aircrew-image" />
        {loading ? <p>Loading...</p> : <h3 className="ame-number">{ameNumber}</h3>}
      </header>
      <div className="Container">
        <h1>How we can help</h1>
        <p>Save time, reduce errors, and improve<br />compliance with our easy-to-use software.</p>
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            marginTop: 2,
            width: '140px',
            backgroundColor: 'blue',
            '&:hover': {
              backgroundColor: '#4B0082',
            },
          }}
        >
          Learn more
        </Button>
      </div>
      <CardContainer>
        {cardData.map(card => (
          <Card key={card.Id}>
            <p>Card ID: {card.Id}</p>
            <h1>{card.text}</h1>
          </Card>
        ))}
      </CardContainer>
      <Footer />
    </div>
  );
};

export default Home;
