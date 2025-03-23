import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUser,FaFileExport,FaPlus } from 'react-icons/fa';
import axios from 'axios';
import URL from '../../components/config';
import html2pdf from "html2pdf.js";

import { MdOutlineLibraryAdd } from "react-icons/md";
import { useSelection } from '../../context/SelectionContext';
const SidebarContainer = styled('div')({
  width: '260px',
  height: '100vh',
  backgroundColor: '#202123',
  color: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid #4d4d4f',
  borderRadius: '0 20px 0px 0'
  
});
const EntryItemWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#343541'
    }
  });
  
  const Checkbox = styled('input')({
    cursor: 'pointer',
    marginRight: '8px'
  });
  
  const ExportInfo = styled('span')({
    color: '#8e8ea0',
    fontSize: '12px',
    marginLeft: 'auto'
  });

  
const SearchContainer = styled('div')({
    padding: '14px',
    borderBottom: '1px solid #4d4d4f',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  });
const SearchInput = styled('input')({
  width: '100%',
  padding: '8px 12px 8px 32px',
  backgroundColor: '#40414f',
  border: 'none',
  borderRadius: '6px',
  color: '#FFFFFF',
  '&::placeholder': {
    color: '#8e8ea0'
  }
});
const SearchWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  });
  
  const IconButton = styled('button')({
    background: 'none',
    border: 'none',
    color: '#8e8ea0',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    '&:hover': {
      backgroundColor: '#343541',
      color: '#FFFFFF'
    }
  });

const RecentEntries = styled('div')({
  flex: 1,
  overflowY: 'auto',
  padding: '10px 0'
});

const EntryHeading = styled('h3')({
  padding: '0 14px',
  fontSize: '12px',
  textTransform: 'uppercase',
  color: '#8e8ea0',
  marginBottom: '8px'
});

const SearchIcon = styled('div')({
    position: 'absolute',
    left: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#8e8ea0',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none'
  });
  const EntryItem = styled('div')(({ isHighlighted }) => ({
    padding: '10px 14px',
    cursor: 'pointer',
    backgroundColor: isHighlighted ? '#343541' : 'transparent',
    '&:hover': {
      backgroundColor: '#343541'
    },
    transition: 'background-color 0.2s ease'
  }));
  

const EntryTitle = styled('p')({
  fontSize: '14px',
  marginBottom: '4px'
});

const EntryDate = styled('span')({
  fontSize: '12px',
  color: '#8e8ea0'
});
const AuthDivider = styled('div')({
    height: "1px",
    width: "40px",
    transform: 'rotate(90deg)',
    backgroundColor: '#4d4d4f',
    marginTop: "20px"
  });
  


const AuthButtonsContainer = styled('div')({
    padding: '14px',
    borderTop: '1px solid #4d4d4f',
    display: 'flex',
    gap: '8px'
  });
  
  const AuthButton = styled('button')({
    flex: 1,
    padding: '8px 16px',
    backgroundColor: '#343541',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#40414f',
      transform: 'translateY(-1px)'
    }
  });


const ProfileButton = styled('div')({
  padding: '14px',
  borderTop: '1px solid #4d4d4f',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#343541'
  }
});
const ButtonGroup = styled('div')({
    display: 'flex',
    gap: '10px',
    padding: '14px',
    borderTop: '1px solid #4d4d4f'
  });
  

  const ActionButton = styled('button')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#343541',
    color: '#FFFFFF',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%',
    // Curve only top-left and bottom-right corners
    borderTopLeftRadius: '12px',
    borderBottomRightRadius: '12px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#40414f',
      transform: 'translateY(-1px)'
    }
  });
  
 
const Sidebar = () => {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [highlightedId, setHighlightedId] = useState(null);
  const { selectedEntries, handleSelect,setSelectedEntries } = useSelection();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const isLoggedIn = localStorage.getItem('auth-token');

  

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${URL}/getlogs/entries`, {
          headers: {
            'auth-token': localStorage.getItem('auth-token')
          }
        });
        // Access the data property of the response
        setEntries(response.data || []);
      } catch (error) {
        console.error('Error fetching entries:', error);
        setEntries([]); // Set empty array on error
      }
    };
    fetchEntries();
  }, []);

  const handleLongPress = (entry) => {
    setIsSelectionMode(true);
    handleSelect(entry);
  };

  const handleTouchStart = (entry) => {
    const timer = setTimeout(() => handleLongPress(entry), 500);
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
    }
  };


   const handleExportClick = async () => {
      if (selectedEntries.length === 0) {
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
      margin-top: -1px; /* Reduced top margin */
  
          }
       th{
          font-weight: 900; /* Stronger bold */
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
  
  // const handleExportClick = () => {
  //   if (selectedEntries.length > 0) {
  //     navigate('/pdf', { state: { selectedData: selectedEntries } });
  //   }
  //   console.log("Exporting selected entries:", selectedEntries);
  // };


  const handleEntryClick = (id) => {
    setHighlightedId(id);
    navigate(`/log/${id}`);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };
  const filteredEntries = Array.isArray(entries) ? entries
  .filter(entry => 
    entry?.Location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry?.ACRegNo?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .slice(0, 10) // Show only last 10 entries
  : [];
    // Show only last 10 entries

  return (
    <SidebarContainer>
      <SearchContainer>
      <SearchWrapper>
        <SearchIcon>
          <FaSearch size={14} />
        </SearchIcon>
        <SearchInput 
          placeholder="Search entries..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchWrapper>
      <IconButton onClick={() => navigate('/bot')}>
        
        <MdOutlineLibraryAdd  size={26} />

      </IconButton>
    </SearchContainer>
      <ButtonGroup>
        <ActionButton onClick={handleExportClick}>
          <FaFileExport />
          <span>
            {isSelectionMode 
              ? `Export Selected (${selectedEntries.length}/7)` 
              : 'Export to PDF'}
          </span>

        </ActionButton>
      </ButtonGroup>

      <RecentEntries>
        <EntryHeading>
          Recent Entries
          {isSelectionMode && (
            <ExportInfo onClick={() => {
              setIsSelectionMode(false);
              setSelectedEntries([]);
            }}>
              Cancel
            </ExportInfo>
          )}
        </EntryHeading>
        {filteredEntries.map((entry) => (
          <EntryItemWrapper 
            key={entry._id}
            onTouchStart={() => handleTouchStart(entry)}
            onTouchEnd={handleTouchEnd}
            onClick={() => isSelectionMode 
              ? handleSelect(entry)
              : handleEntryClick(entry._id)
            }
          >
            {isSelectionMode && (
              <Checkbox
                type="checkbox"
                checked={selectedEntries.includes(entry)}
                onChange={() => handleSelect(entry)}
              />
            )}
            <div>
              <EntryTitle>{entry.Location} - {entry.ACRegNo}</EntryTitle>
              <EntryDate>
                {new Date(entry.dateTime).toLocaleDateString()}
              </EntryDate>
            </div>
          </EntryItemWrapper>
        ))}
      </RecentEntries>


      {isLoggedIn ? (
  <ProfileButton onClick={handleProfileClick}>
    <FaUser />
    <span>Profile</span>
  </ProfileButton>
) : (
  <AuthButtonsContainer>
    <AuthButton onClick={() => navigate('/login')}>
      Login
    </AuthButton>
    <AuthDivider/>

    <AuthButton onClick={() => navigate('/signup')}>
      Sign Up
    </AuthButton>
  </AuthButtonsContainer>
)}
    </SidebarContainer>
  );
};

export default Sidebar;