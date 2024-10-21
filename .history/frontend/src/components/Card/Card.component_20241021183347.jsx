// Cards.js
import React, { useContext ,useState} from 'react';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import Card from './Card';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Card.css';
import { ToastContainer, toast } from 'react-toastify';  // Import toast functions
import 'react-toastify/dist/ReactToastify.css';  // Import default styles
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';
import LogsContext from '../../context/LogContext';
import URL from '../config';
import homeImage from './assests/home.jpg'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const CardItem = styled.div`
  position: relative; /* Required for positioning the circular box */
  margin: 10px;
`;


const CircularBox = styled.div`
  position: absolute; /* Position the circular box */
  top: -10px; /* Adjust position as needed */
  right: -10px; /* Adjust position as needed */
  width: 30px; /* Size of the circular box */
  height: 30px; /* Size of the circular box */
  border-radius: 50%; /* Make it circular */
  background-color: blue; /* Background color */
  color: white; /* Text color */
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${props => (props.count > 0 ? 'visible' : 'hidden')}; /* Show if count > 0 */
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;




const ExportButton = styled.button`

  margin-top: 10px;

  background-color: #6969cf;

  color: white;

  width:300px;

  border: none;

  padding: 10px;

  border-radius: 5px;

  cursor: pointer;



`;
const Cards = () => {
  useDocumentTitle('Past Entries');

  const { filteredLogs, searchTerm, setSearchTerm, selectedLogs, handleSelect } = useContext(LogsContext);
  const [counts, setCounts] = useState({}); // Store counts for each card
  const [selectedIds, setSelectedIds] = useState(new Set()); // Set to track selected IDs

  const navigate = useNavigate(); // Initialize the navigate function


  const handleCardClick = (logId) => {
    // Redirect to log details page based on logId
    navigate(`/log/${logId}`);
  };
  const handleAddButtonClick = () => {

    navigate('/form'); // Navigate to the form page

  };

  const handleLongPress = (logId) => {
    // Check if the ID is already counted
    if (!selectedIds.has(logId)) {
      // If not, increment the count and add the ID to the set
      setCounts((prevCounts) => ({
        ...prevCounts,
        [logId]: (prevCounts[logId] || 0) + 1,
      }));
      setSelectedIds((prevIds) => new Set(prevIds).add(logId)); // Add ID to selected IDs
    } else {
      toast.info('This log is already selected!'); // Notify if the log is already selected
    }
  };
  

  const selectedArray = Array.from(selectedIds); // Convert Set to array
console.log(selectedArray)
 
  

  return (
    <Container>
 <div className="logs-container">

<div className="logs-title">

  Logs

</div> 

<div className="add-button" onClick={handleAddButtonClick}>

  +

</div>

</div>

      <InputText
        placeholder="Search by ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='Input'
      />

      <div>
        <ExportButton onClick={handleExportPDF} disabled={selectedIds.length === 0}>
          Export to PDF
        </ExportButton>
      </div>

      <CardContainer>
      {filteredLogs.map((log) => (
        <CardItem key={log.Id}>
                {/* {console.log("Log ID:", log.Id, "Date:", log.createdAt, "ToA:", log.ToA)} */}

          <CircularBox count={counts[log.Id] || 0}>
            {counts[log.Id] || 0} {/* Display the count */}
          </CircularBox>
          <Card
            date={new Date(log.createdAt).toLocaleDateString()}
            ToA={log.ToA}
            id={log.Id}
// Pass long press event
onLongPress={() => handleLongPress(log.Id)}
            onChange={() => selectedIds(log)}
            onClick={() => handleCardClick(log.Id)}  // Redirect when card is clicked

          />
        </CardItem>
      ))}
    </CardContainer>

{/* 
      <CardContainer>
        {filteredLogs.map((log) => (
          <div className='card-item' key={log.Id}>
        
            <Card date={new Date(log.createdAt).toLocaleDateString()} ToA={log.ToA} id={log.Id} />
            
          </div>
        ))}
      </CardContainer> */}

      <ToastContainer />  {/* Render the ToastContainer */}
    </Container>
  );
};

export default Cards;


// checked={selectedLogs.includes(log)}
// onChange={() => handleSelect(log)}