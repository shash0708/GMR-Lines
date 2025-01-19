// Cards.js
import React, { useContext ,useState} from 'react';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import Card from './Card';
import dayjs from 'dayjs';

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

  const formattedLogs = selectedLogs.map((log) => ({
    ...log,
    dateTime: log.dateTime ? dayjs(log.dateTime).format('DD-MM-YYYY HH:mm') : 'N/A', // Convert to readable format
  }));

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
            font-family: 'Garamond', serif;
            font-size: 10px;
        }
        .table-container {
            margin: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
        }
        .date-cell {
            width: 10%;
            font-size: 10px;
        }
        .fixed-width {
            width: 7%;
            font-size: 10px;
        }
        .spa {
            width: 12px; /* Fixed width for "spa" columns */
            text-align: centerfont-size: 10px;

            vertical-align: middle;
            white-space: nowrap; /* Prevents wrapping */
        }
        .spa span {
            display: inline-block;
            transform: rotate(90deg); /* Rotates the content vertically */
            transform-origin: center;
            line-height: 1;
        }
        .op-col {
            font-size: 10px;
            text-align: center;
        }
        .ata-column {
            width: 3%;
            font-size: 10px;
            text-align: center;
        }
        .empty-cell {
            width: 100px;
        }
    </style>
</head>
<body>
    <div class="table-container">
        <!-- Table Header -->
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

        <!-- Logbook Details -->
        <h5>6. Logbook Record</h5>
        <table>
            <tr>
                <th>Name:</th>
                <th>AME Licence Number:</th>
                <th>Authorization Number:</th>
            </tr>
        </table>
        
        <!-- Main Table -->
        <table>
            <tr>
                <th class="date-cell">I.</th>
                <th class="fixed-width">II</th>
                <th class="fixed-width">III</th>
                <th class="fixed-width">IV.</th>
                <th class="fixed-width">V</th>
                <th class="fixed-width">VI</th>
                <th colspan="8" class="fixed-width">VII<br>Maintenance Task Type</th>
                <th colspan="4" class="fixed-width">VIII<br>Type of Maintenance Activity</th>
                <th class="ata-column">IX</th>
                <th colspan="3" class="op-col">X</th>
                <th class="ata-column">XI</th>
                <th class="ata-column">XII</th>
                <th class="ata-column">XIII</th>
            </tr>
            <tr>
                <th class="date-cell">Date & Time</th>
                <th class="fixed-width">Location</th>
                <th class="fixed-width">A/C Type or Comp. Part No</th>
                <th class="fixed-width">A/C Reg. No. or Comp. S/N</th>
                <th class="fixed-width">Type of Maintenance (Rating)</th>
                <th class="fixed-width">Certification Privilege Used</th>
                <th class="spa"><span>FOT</span></th>
                <th class="spa"><span>SGH</span></th>
                <th class="spa"><span>R/I</span></th>
                <th class="spa"><span>MEL</span></th>
                <th class="spa"><span>TS</span></th>
                <th class="spa"><span>MOD</span></th>
                <th class="spa"><span>REP</span></th>
                <th class="spa"><span>INSP</span></th>
                <th class="spa"><span>Training</span></th>
                <th class="spa"><span>Perform</span></th>
                <th class="spa"><span>Supervise</span></th>
                <th class="spa"><span>CRS/RTS</span></th>
                <th class="ata-column">ATA</th>
                <th colspan="3" class="op-col">Operations Performed</th>
                <th class="ata-column">Time<br>Duration<br>Hours/<br>Days</th>
                <th class="ata-column">Maintenance<br>Record<br>Reference</th>
                <th class="ata-column">Supervisor<br>Name, AME Licence No & Signature</th>
            </tr>
            <tbody>
                <!-- Dynamic Logs -->
                ${formattedLogs.map(log => `
                <tr>
                    <td class="date-cell">${log.dateTime}</td>
                    <td class="fixed-width">${log.Location}</td>
                    <td class="fixed-width">${log.ACTtype}</td>
                    <td class="fixed-width">${log.ACRegNo}</td>
                    <td class="fixed-width">${log.TOM}</td>
                    <td class="fixed-width">${log.CPU}</td>
                    <td class="spa"><span>${log.FOT}</span></td>
                    <td class="spa"><span>${log.SGH}</span></td>
                    <td class="spa"><span>${log.RI}</span></td>
                    <td class="spa"><span>${log.MEL}</span></td>
                    <td class="spa"><span>${log.TS}</span></td>
                    <td class="spa"><span>${log.MOD}</span></td>
                    <td class="spa"><span>${log.REP}</span></td>
                    <td class="spa"><span>${log.INSP}</span></td>
                    <td class="spa"><span>${log.Training}</span></td>
                    <td class="spa"><span>${log.Perform}</span></td>
                    <td class="spa"><span>${log.Supervise}</span></td>
                    <td class="spa"><span>${log.CRS_RTS}</span></td>
                    <td class="ata-column">${log.ATA}</td>
                    <td colspan="3" class="op-col">${log.OP}</td>
                    <td class="ata-column">${log.DU}</td>
                    <td class="ata-column">${log.MRR}</td>
                    <td class="ata-column">${log.Supervisor}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>

        <!-- Footer -->
        <br><br>
        <table>
            <tr>
                <th class="date-cell">Date</th>
                <th class="empty-cell" colspan="5"></th>
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
          <div className='card-item' key={log.Id}>
            <input
              type="checkbox"
              checked={selectedLogs.includes(log)}
              onChange={() => handleSelect(log)}
            />
            <Card date={new Date(log.createdAt).toLocaleDateString()} ToA={log.ToA} id={log.Id} />
          </div>
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