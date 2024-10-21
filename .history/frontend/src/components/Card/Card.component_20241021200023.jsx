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

  const { filteredLogs = [], searchTerm, setSearchTerm } = useState();
  const [selectedIds, setSelectedIds] = useState(new Set());
  const navigate = useNavigate();

  const handleCardClick = (logId) => {
    navigate(`/log/${logId}`);
  };

  const handleAddButtonClick = () => {
    navigate('/form');
  };

  const handleCheckboxChange = (log) => {
    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(log.Id)) {
      newSelectedIds.delete(log.Id);
    } else if (newSelectedIds.size < 7) {
      newSelectedIds.add(log.Id);
    } else {
      toast.info('You can select up to 7 logs only.');
    }
    setSelectedIds(newSelectedIds);
  };

  const handleExportPDF = async () => {
    if (selectedIds.size === 0) {
      toast.info('Please select at least one log to export.');
      return;
    }

    const selectedArray = filteredLogs.filter(log => selectedIds.has(log.Id));

    try {
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
        </head>
        <body>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>A/C Type or Comp. Part No</th>
                  <th>A/C Reg. No. or Comp. S/N</th>
                  <th>Maintenance Task Type</th>
                  <th>Operations Performed</th>
                  <th>Duration</th>
                  <th>Supervisor</th>
                </tr>
              </thead>
              <tbody>
                ${selectedArray.map(log => `
                  <tr>
                    <td>${log.Date}</td>
                    <td>${log.Location}</td>
                    <td>${log.ACTtype}</td>
                    <td>${log.ACRegNo}</td>
                    <td>${log.TOM}</td>
                    <td>${log.OP}</td>
                    <td>${log.DU}</td>
                    <td>${log.Supervisor}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </body>
        </html>
      `;

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;

      html2pdf().from(tempDiv).set({
        margin: [10, 10, 10, 10],
        filename: 'Logbook.pdf',
        html2canvas: { scale: 10 },
        jsPDF: { format: 'a4', orientation: 'landscape' }
      }).save();
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Error exporting PDF');
    }
  };

  return (
    <Container>
      <div className="logs-container">
        <div className="logs-title">Logs</div>
        <div className="add-button" onClick={handleAddButtonClick}>+</div>
      </div>

      <InputText
        placeholder="Search by ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='Input'
      />

      <ExportButton onClick={handleExportPDF} disabled={selectedIds.size === 0}>
        Export to PDF
      </ExportButton>

      <CardContainer>
        {filteredLogs.map((log) => (
          <CardItem key={log.Id}>
            <input
              type="checkbox"
              checked={selectedIds.has(log.Id)}
              onChange={() => handleCheckboxChange(log)}
            />
            <Card
              date={new Date(log.createdAt).toLocaleDateString()}
              ToA={log.ToA}
              id={log.Id}
              onClick={() => handleCardClick(log.Id)}
            />
          </CardItem>
        ))}
      </CardContainer>

      <ToastContainer />
    </Container>
  );
};

export default Cards;

export default Cards;


// checked={selectedLogs.includes(log)}
// onChange={() => handleSelect(log)}