// Cards.js
import React, { useContext } from 'react';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import Card from './Card';
import html2pdf from 'html2pdf.js';

import './Card.css';
import { ToastContainer, toast } from 'react-toastify';  // Import toast functions
import 'react-toastify/dist/ReactToastify.css';  // Import default styles
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';
import LogsContext from '../../context/LogContext';
import URL from '../config';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Logbook</title>
          <style>
            body {
              font-family: 'Garamond', serif;
              font-size: 12px; /* Adjust font size for better quality */
              margin: 0;
              padding: 0;
            }
            .table-container {
              margin: 20px;
              overflow: hidden;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              page-break-inside: auto; /* Ensure tables don't break awkwardly */
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .wide-column {
              width: 30%;
            }
            .fixed-width {
              width: 60px; /* Adjust column width as needed */
            }
            .fixed-col {
              height: 70px;
            }
            @media print {
              table {
                page-break-inside: auto;
              }
              tr {
                page-break-inside: avoid;
                page-break-after: auto;
              }
            }
          </style>
        </head>
        <body>
          <div class="table-container">
            <table>
              <thead>
                <tr class="fixed-col">
                  <th colspan="11">AIRCRAFT MAINTENANCE ENGINEER'S WORK RECORD/LOGBOOK</th>
                  <th colspan="5">
                    Name<br>
                    Ps<br>
                    Ij
                  </th>
                </tr>
                <tr>
                  <th class="fixed-width">SL NO.</th>
                  <th class="fixed-width">Date & Time</th>
                  <th class="fixed-width">Type of Aircraft/Engine</th>
                  <th class="fixed-width">Aircraft Reg.</th>
                  <th class="fixed-width">ATA Chapter</th>
                  <th class="fixed-width">Work Order No.</th>
                  <th class="wide-column" colspan="5">Maintenance Task</th>
                  <th class="fixed-width">Type of Maintenance</th>
                  <th class="fixed-width">Type of Activity</th>
                  <th class="fixed-width">Category</th>
                  <th class="fixed-width">Duration in Hrs./Days</th>
                  <th colspan="5">Supervisor Name & Sign,AME Licence No</th>
                </tr>
              </thead>
              <tbody>
                ${selectedLogs.map((log, index) => `
                  <tr>
                    <td class="fixed-width">${log.Id}</td>
                    <td class="fixed-width">${new Date(log.createdAt).toLocaleDateString()}</td>
                    <td class="fixed-width">${log.ToA}</td>
                    <td class="fixed-width">${log.Reg}</td>
                    <td class="fixed-width">${log.ATA}</td>
                    <td class="fixed-width">${log.Wo}</td>
                    <td class="wide-column" colspan="5">${log.Mt}</td>
                    <td class="fixed-width">${log.TOM}</td>
                    <td class="fixed-width">${log.TOA}</td>
                    <td class="fixed-width">${log.C}</td>
                    <td class="fixed-width">${log.DU}</td>
                    <td colspan="1">${log.Supervisor}</td>
                  </tr>
                `).join('')}
                <tr>
                  <td colspan="2">Date</td>
                  <th colspan="3"></th>
                  <th class="fixed-width"></th>
                  <th colspan="5">Log Book Owner's Signature (*)</th>
                  <th colspan="5"></th>
                </tr>
                <tr>
                  <th colspan="16">Blah Blah Blah</th>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
        </html>
      `;
  
      // Create a temporary HTML element to hold the content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      document.body.appendChild(tempDiv);
  
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

      <ToastContainer />  {/* Render the ToastContainer */}
    </Container>
  );
};

export default Cards;
