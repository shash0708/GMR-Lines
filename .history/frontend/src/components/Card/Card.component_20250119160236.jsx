// Cards.js
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { InputText } from "primereact/inputtext";
import Card from "./Card";
import dayjs from "dayjs";

import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./Card.css";
import { ToastContainer, toast } from "react-toastify"; // Import toast functions
import "react-toastify/dist/ReactToastify.css"; // Import default styles
import useDocumentTitle from "../hooks/useDocumentTitle";
import axios from "axios";
import LogsContext from "../../context/LogContext";
import URL from "../config";
import homeImage from "./assests/home.jpg";
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
  visibility: ${(props) =>
    props.count > 0 ? "visible" : "hidden"}; /* Show if count > 0 */
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

  width: 300px;

  border: none;

  padding: 10px;

  border-radius: 5px;

  cursor: pointer;
`;
const Cards = () => {
  useDocumentTitle("Past Entries");

  const {
    filteredLogs,
    searchTerm,
    setSearchTerm,
    selectedLogs,
    handleSelect,
  } = useContext(LogsContext);
  const [counts, setCounts] = useState({}); // Store counts for each card
  const [selectedIds, setSelectedIds] = useState(new Set()); // Set to track selected IDs

  const navigate = useNavigate(); // Initialize the navigate function

  const handleCardClick = (logId) => {
    // Redirect to log details page based on logId
    navigate(`/log/${logId}`);
  };
  const handleAddButtonClick = () => {
    navigate("/form"); // Navigate to the form page
  };

  const formattedLogs = selectedLogs.map((log) => ({
    ...log,
    dateTime: log.dateTime
      ? dayjs(log.dateTime).format("DD-MM-YYYY HH:mm")
      : "N/A", // Convert to readable format
  }));

  const handleExportPDF = async () => {
    if (selectedLogs.length === 0) {
      toast.info("Please select at least one log to export.");
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
    margin: -1px 20px; /* Reduced top margin */
}

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px; /* Decreased font size */
    margin-top: -3px; /* Reduced top margin */

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
            width: 25px;
            text-align: center;
            white-space: nowrap; /* Prevent text wrapping */
            font-size: 10px; /* Decreased font size */
               margin: 0; 
                padding:0;
        }
        
        .rotated-text {
            display: inline-block; /* Ensure rotation only applies to text content */
            transform: rotate(-90deg); /* Rotate the text by 270 degrees */
            transform-origin: center; /* Rotate around the center */
                margin: 0; 
                padding:0;

        }
        
        .op-col{
            font-size: 10px;
            text-align: center;

        }
        .ata-column {
            width: 3px; /* Reduced width for the ATA column */
            font-size: 10px;
            text-align: center;

        }
        .date-cell {
            width: 10px; /* Fixed width for the Date cell */
            font-size: 10px;
        }
              .date-cl {
            width: 14px; /* Fixed width for the Date cell */
            font-size: 10px;
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
                <th class="date-cl">I.</th>
                <th class="fixed-width">II</th>
                <th class="fixed-width">III</th>
                <th class="fixed-width">IV.</th>
                <th class="fixed-width">V</th>
                <th class="fixed-width">VI</th>
                <th colspan="8"  class="fixed-width">VII<br> Maintenance Task Type</th>
                <th class="fixed-width" colspan="4">VIII <br>Type of Maintenance activity</th>
                <th class="ata-column">IX</th> <!-- ATA Column with reduced size -->
                <th class="op-col" colspan="3">X</th>
                <th class="ata-column">XI</th>
                <th class="ata-column" >XII</th>
                <th  class="ata-column">XIII</th>
            </tr>
            <tr>
                <th class="date-cl">Date & Time</th>
                <th class="fixed-width">Location</th>
                <th class="fixed-width">A/C Type or Comp. Part No</th>
                <th class="fixed-width">A/C Reg. No. or Comp. S/N</th>
                <th class="fixed-width">Type of Maintenance (Rating)</th>
                <th class="fixed-width">Certification Privilege Used</th>
                <th class="spa"><span class="rotated-text">FOT</span></th>
                <th class="spa"><span class="rotated-text">SGH</span></th>
                <th class="spa"><span class="rotated-text">R/I</span></th>
                <th class="spa"><span class="rotated-text">MEL</span></th>
                <th class="spa"><span class="rotated-text">TS</span></th>
                <th class="spa"><span class="rotated-text">MOD</span></th>
                <th class="spa"><span class="rotated-text">REP</span></th>
                <th class="spa"><span class="rotated-text">INSP</span></th>
                <th class="spa"><span class="rotated-text">Training</span></th>
                <th class="spa"><span class="rotated-text">Perform</span></th>
                <th class="spa"><span class="rotated-text">Supervise</span></th>
                <th class="spa"><span class="rotated-text">CRS/RTS</span></th>
                
                <th class="ata-column">ATA</th> <!-- Reduced ATA column size -->
                <th colspan="3" class="op-col"> Operations Performed</th>
                <th  class="ata-column">Time<br>Duration<br>Hours/<br>Days</th> 
                <th class="ata-column">Maintenance<br>Record<br>ref.</th>
                <th  class="ata-column">Supervisor<br>Name,<br>AME Licence No and Signature</th>
            </tr>
            <tbody>
                ${formattedLogs
                  .map(
                    (log, index) => `
                <tr>
                                <th class="date-cl">${log.dateTime}</th>

                    <th class="fixed-width">${log.Location}</th>
                    <th class="fixed-width">${log.ACTtype}</th>
                    <th class="fixed-width">${log.ACRegNo}</th>
                    <th class="fixed-width">${log.TOM}</th>
                    <th class="fixed-width">${log.CPU}</th>
                    <td class="spa">${log.ATC.FOT === "X" ? "X" : ""}</td>
                    <td class="spa">${log.ATC.SGH === "X" ? "X" : ""}</td>
                    <td class="spa">${log.ATC.RI === "X" ? "X" : ""}</td>
                    <td class="spa">${log.ATC.MEL === "X" ? "X" : ""}</td>
                    <td class="spa">${log.ATC.TS === "X" ? "X" : ""}</td>
                    <td class="spa">${log.ATC.MOD === "X" ? "X" : ""}</td>
                    <td class="spa">${log.ATC.REP === "X" ? "X" : ""}</td>
                    <td class="spa">${log.ATC.INSP === "X" ? "X" : ""}</td>
                    <td class="spa">${log.ATC.Training === "X" ? "X" : ""}</td>
                    <td class="spa">${log.ATC.Perform === "X" ? "X" : ""}</td>
                    <td class="spa">${log.ATC.Supervise === "X" ? "X" : ""}</td>
                    <td class="spa">${log.ATC.CRS_RTS === "X" ? "X" : ""}</td>
                    <th class="ata-column">${log.ATA}</th>   
                    <th colspan="3" class="op-col">${log.OP}</th>
                    <th class="ata-column">${log.DU}</th> 
                    <th class="ata-column">${log.MRR}</th>
                    <th class="ata-column">${log.Supervisor}</th>
                </tr>
                `
                  )
                  .join("")}
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
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;

      // Convert the temporary HTML content to PDF
      html2pdf()
        .from(tempDiv)
        .set({
          margin: [10, 10, 10, 10], // Adjust margins as needed
          filename: "Logbook.pdf",
          html2canvas: { scale: 10 }, // Increase scale for better quality
          jsPDF: { format: "a4", orientation: "landscape" }, // Set to A4 and landscape orientation
        })
        .save()
        .then(() => {
          // Cleanup
          document.body.removeChild(tempDiv);
        });
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Error exporting PDF");
    }
  };

  return (
    <Container>
      <div className="logs-container">
        <div className="logs-title">Logs</div>

        <div className="add-button" onClick={handleAddButtonClick}>
          +
        </div>
      </div>
      <InputText
        placeholder="Search by ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="Input"
      />
      <div>
        <ExportButton
          onClick={handleExportPDF}
          disabled={selectedIds.length === 0}
        >
          Export to PDF
        </ExportButton>
      </div>
      <CardContainer>
        {filteredLogs.map((log) => (
          <div className="card-item" key={log.Id}>
            <input
              type="checkbox"
              checked={selectedLogs.includes(log)}
              onChange={() => handleSelect(log)}
            />
            <Card
              date={new Date(log.createdAt).toLocaleDateString()}
              ToA={log.ToA}
              id={log.Id}
            />
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
      <ToastContainer /> {/* Render the ToastContainer */}
    </Container>
  );
};

export default Cards;

// checked={selectedLogs.includes(log)}
// onChange={() => handleSelect(log)}
