import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import URL from "../config";
import "./Home.css";
import Footer from "../Footer/Footer.component";
import { Button } from "@mui/material";
import styled from "styled-components";
import { FaRegLightbulb } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns */
  gap: 10px; /* Space between cards */
  padding:10px;

`;

const Card = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border:1px solid grey;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const cardData = [
  { Id: "Stay complaint", text: "Our automated system helps you stay up to date with the latest regulations.",icon:<FaRegLightbulb />  },
  { Id: "Improve efficiency", text: "Automate your HR processes and focus on what matters most.",icon:<CiCalendarDate />  },
  { Id: "Make better decisons", text: "Get insights into your data to make smarter business decisions.",<IoSettingsOutline />
  },
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
            marginLeft: '10px',
            width: '100%', // Ensures the button takes up full width of its container
            backgroundColor: 'blue',
            '&:hover': {
              backgroundColor: '#4B0082',
            },
          }}
          style={{
            display: "flex",
            marginLeft: "-180px", // Fixed typo in margin-left
            padding: "10px",
            width: "140px",
          }}
        >
          Learn more
        </Button>
      </div>
      <CardContainer>
        {cardData.map(card => (
          <Card key={card.Id}>
            <h1 >{` ${card.Id}`}</h1>
            <p variant="h6">{card.text}</p>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
};

export default Home;
