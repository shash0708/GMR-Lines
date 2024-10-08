import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import Card from './Card';
import './Card.css';
import { ToastContainer, toast } from 'react-toastify';  // Import toast functions
import 'react-toastify/dist/ReactToastify.css';  // Import default styles
import useDocumentTitle from '../hooks/useDocumentTitle';
import URL from '../config'
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
  margin-right: 10px; /* Add some space between buttons */
`;

const Cards = () => {
  useDocumentTitle('Past Entries'); // Set the document title for this page

  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLogs, setSelectedLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`${URL}/getlogs/entries`, {
          method: 'GET', // Use GET method for fetching user data
          headers: {
            "auth-token": localStorage.getItem('token')
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setLogs(data);
        setFilteredLogs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = logs.filter(log => {
        const logId = String(log.Toa);
        return logId.toLowerCase().includes(lowerCaseSearchTerm);
      });
      setFilteredLogs(filtered);
    };

    handleSearch();
  }, [searchTerm, logs]);

  const handleSelect = (log) => {
    setSelectedLogs(prev => {
      const isSelected = prev.includes(log);
      
      if (isSelected) {
        return prev.filter(selectedLog => selectedLog !== log);
      }

      if (prev.length >= 7) {
        toast.warn('You can only select up to 7 logs.');  // Show warning toast
        return prev;
      }

      return [...prev, log];
    });
  };

  const handleExportExcel = async () => {
    if (selectedLogs.length === 0) {
      toast.info('Please select at least one log to export.');  // Show info toast
      return;
    }
    
    try {
      const selectedIds = selectedLogs.map(log => log.Id);
      const response = await axios.post(`${URL}/logs/export`, selectedIds, {
        headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
        },
        responseType: 'blob'
    });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'GmrLogBook.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Error exporting data');  // Show error toast
    }
  };
  

  const handleExportPDF = async () => {
    if (selectedLogs.length === 0) {
        toast.info('Please select at least one log to export.');  // Show info toast
        return;
    }
    
    try {
        const selectedIds = selectedLogs.map(log => log.Id);
        const token = localStorage.getItem('token');
        console.log(token);
        console.log('PDF')
        // http://localhost:5000
        const response = await fetch(`${URL}/logs/pdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify(selectedIds)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }a

        const blob = await response.blob();

        // Create a URL for the blob response
        const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

        // Create a link element and trigger a download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'GMRLogBook.pdf');  // Set the correct file name
        document.body.appendChild(link);
        link.click();
        
        // Clean up and remove the link element
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Revoke the URL after download
    } catch (error) {
        console.error('Error exporting PDF:', error);
        toast.error('Error exporting PDF');  // Show error toast
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
        {/* <ExportButton onClick={handleExportExcel} disabled={selectedLogs.length === 0}>
          Export to Excel
        </ExportButton> */}
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
