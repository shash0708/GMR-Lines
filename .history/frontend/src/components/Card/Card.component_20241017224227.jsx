// Cards.js
import React, { useContext,useState } from 'react';
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
  background-color: blue;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const Cards = () => {
  useDocumentTitle('Past Entries');

  const { filteredLogs, searchTerm, setSearchTerm, selectedLogs, handleSelect } = useContext(LogsContext);
  const [counts, setCounts] = useState({}); // Store counts for each card
  const [selectedIds, setSelectedIds] = useState(new Set()); // Set to track selected IDs

  const navigate = useNavigate(); // Initialize the navigate function

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
    }
  };


  const handleExportPDF = async () => {
    if (selectedLogs.length === 0) {
      toast.info('Please select at least one log to export.');
      return;
    }
  
    try {
      // Generate the HTML content
      const htmlContent = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.5/css/mdb.min.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logbook</title>
    <style>    
        body {
            font-family: 'Garamond';
            font-size: 10px; /* Decreased font size */

        }
        .table-container {
            margin: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px; /* Decreased font size */

        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        .wide-column {
            width: 30%;
            font-size: 10px; /* Decreased font size */
            text-align: center;

        }
        .fixed-width {
            width: 7px;
                        font-size: 10px; /* Decreased font size */
                        text-align: center;

        }
        .spa {
            width: 10px; /* Fixed width for the "spa" columns */
            transform: rotate(180deg); /* Rotates the text by 180 degrees */
            writing-mode: vertical-rl; /* Ensures the rotated text remains readable */
            text-align: center;
            white-space: nowrap; /* Prevents wrapping inside the column */
            font-size: 10px; /* Decreased font size */
        }
        
        .ata-column {
            width: 50px; /* Reduced width for the ATA column */
        }
        .date-cell {
            width: 50px; /* Fixed width for the Date cell */
        }
        .empty-cell {
            width: 100px; /* Fixed width for empty cells */
        }
    </style>
</head>
<body>
    <div class="table-container">
        <table>
            <tr>
                <th colspan="5">
                    Name<br>
                    Ps<br>
                    Ij
                </th>
                <th colspan="11">AIRCRAFT MAINTENANCE ENGINEER/COMPONENT MAINTENANCE ENGINEER/SPECIALIZED SERVICES STAFF WORK RECORD/MAINTENANCE EXPERIENCE LOGBOOK</th>
            </tr>
        </table>  

        <h5>6. Logbook Record</h5>
        <table>
            <tr>
                <th>Name :</th>
                <th>AME Licence Number</th>
                <th>Authorization Number:</th>
            </tr>
        </table>
        
        <table>
            <tr>
                <th class="fixed-width">I.</th>
                <th class="fixed-width">II</th>
                <th class="fixed-width">III</th>
                <th class="fixed-width">IV.</th>
                <th class="fixed-width">V</th>
                <th class="fixed-width">VI</th>
                <th colspan="8"  class="fixed-width">VII<br> Maintenance Task Type</th>
                <th class="fixed-width" colspan="4">VIII <br>Type of Maintenance activity</th>
                <th class="fixed-width">IX</th> <!-- ATA Column with reduced size -->
                <th class="fixed-width" colspan="3">X</th>
                <th class="fixed-width">XI</th>
                <th >XII</th>
                <th>XIII</th>
            </tr>
            <tr>
                <th class="fixed-width">Date & Time</th>
                <th class="fixed-width">Location</th>
                <th class="fixed-width">A/C Type or Comp. Part No</th>
                <th class="fixed-width">A/C Reg. No. or Comp. S/N</th>
                <th class="fixed-width">Type of Maintenance (Rating)</th>
                <th class="fixed-width">Certification Privilege Used</th>
                <th class="spa">FOT</th>
                <th class="spa">FOT</th>
                <th class="spa">FOT</th>
                <th class="spa">FOT</th>
                <th class="spa">FOT</th>
                <th class="spa">FOT</th>
                <th class="spa">FOT</th>
                <th class="spa">FOT</th>
                <th class="spa">FOT</th>
                <th class="spa">FOT</th>
                <th class="spa">FOT</th>
                <th class="spa">FOT</th>
                <th class="ata-column"></th> <!-- Reduced ATA column size -->
                <th colspan="3"> Operations Performed</th>
                <th>Time<br>Duration<br>Hours/<br>Days</th> 
                <th >Mainten<br>ance<br>Record<br>ref.</th>
                <th>Supervisor<br>Name<br>AME<br> Licence No</th>
            </tr>
            <tbody>
                ${selectedLogs.map((log, index) => `
                <tr>
                    <th class="fixed-width">${log.Location}</th>
                    <th class="fixed-width">${log.ACTtype}</th>
                    <th class="fixed-width">${log.ACRegNo}</th>
                    <th class="fixed-width">${log.TOM}</th>
                    <th class="fixed-width">${log.CPU}</th>
                    <th class="fixed-width">${log.FOT}</th>
                    <th class="spa">${log.SGH}</th>
                    <th class="spa">${log.RI}</th>
                    <th class="spa">${log.MEL}</th>
                    <th class="spa">${log.TS}</th>
                    <th class="spa">${log.MOD}</th>
                    <th class="spa">${log.REP}</th>
                    <th class="spa">${log.INSP}</th>
                    <th class="spa">${log.Training}</th>
                    <th class="spa">${log.Perform}</th>
                    <th class="spa">${log.Supervise}</th>
                    <th class="spa">${log.CRS_RTS}</th>
                    <th class="ata-column">${log.ATA}</th>
                    <th colspan="3">${log.OP}</th>
                    <th>${log.DU}</th> 
                    <th >${log.MRR}</th>
                    <th >${log.Supervisor}</th>
                </tr>
                `).join('')}
            </tbody>
            <br><br>
            <table>
                <tr>
                    <th class="date-cell">Date</th>
                    <th class="empty-cell" colspan="5"></th> <br>
                    <th>Log Book Owner's Signature (*)</th>
                    <th colspan="5"></th>
                </tr>
            </table>
            <table>
                <tr>
                    <th colspan="16">Blah Blah Blah</th>
                </tr>
            </table>
    </div>
</body>
</html>
`;
  
      // Create a temporary HTML element to hold the content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
  
      // Convert the temporary HTML content to PDF
      html2pdf().from(tempDiv).set({
        margin: [10, 10, 10, 10], // Adjust margins as needed
        filename: 'Logbook.pdf',
        html2canvas: { scale:10 }, // Increase scale for better quality
        jsPDF: { format: 'a4', orientation: 'landscape' } // Set to A4 and landscape orientation
      }).save().then(() => {
        // Cleanup
        document.body.removeChild(tempDiv);
      });
  
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Error exporting PDF');
    }
  };
  
  

  return (
    <Container>
   <div className="logs-container">
  <div className="logs-title">
    Logs
  </div> 
  <div className="add-button">
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
        <ExportButton onClick={handleExportPDF} disabled={selectedLogs.length === 0}>
          Export to PDF
        </ExportButton>
      </div>
      <CardContainer>
      {filteredLogs.map((log) => (
        <CardItem key={log.Id}>
          <CircularBox count={counts[log.Id] || 0}>
            {counts[log.Id] || 0} {/* Display the count */}
          </CircularBox>
          <Card
            date={new Date(log.createdAt).toLocaleDateString()}
            ToA={log.ToA}
            id={log.Id}
            onLongPress={() => handleLongPress(log.Id)} // Pass long press event
          />
        </CardItem>
      ))}
    </CardContainer>

      <ToastContainer />  {/* Render the ToastContainer */}
    </Container>
  );
};

export default Cards;
