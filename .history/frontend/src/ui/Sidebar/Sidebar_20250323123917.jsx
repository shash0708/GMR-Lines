import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUser,FaFileExport } from 'react-icons/fa';
import axios from 'axios';
import URL from '../../components/config';

const SidebarContainer = styled('div')({
  width: '260px',
  height: '100vh',
  backgroundColor: '#202123',
  color: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid #4d4d4f'
});

const SearchContainer = styled('div')({
  padding: '14px',
  borderBottom: '1px solid #4d4d4f'
});

const SearchInput = styled('input')({
  width: '100%',
  padding: '8px 12px',
  backgroundColor: '#40414f',
  border: 'none',
  borderRadius: '6px',
  color: '#FFFFFF',
  '&::placeholder': {
    color: '#8e8ea0'
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

const EntryItem = styled('div')({
  padding: '10px 14px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#343541'
  }
});

const EntryTitle = styled('p')({
  fontSize: '14px',
  marginBottom: '4px'
});

const EntryDate = styled('span')({
  fontSize: '12px',
  color: '#8e8ea0'
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

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${URL}/logs/getlogs`, {
          headers: {
            'auth-token': localStorage.getItem('auth-token')
          }
        });
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };
    fetchEntries();
  }, []);

  const handleEntryClick = (id) => {
    navigate(`/log/${id}`);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const filteredEntries = entries
    .filter(entry => 
      entry.Location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.ACRegNo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 10); // Show only last 10 entries

  return (
    <SidebarContainer>
      <SearchContainer>
        <SearchInput 
          placeholder="Search entries..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      <ButtonGroup>
        <ActionButton onClick={handleExportClick}>
          <FaFileExport />
          <span>Export to PDF</span>
        </ActionButton>
      </ButtonGroup>

      <RecentEntries>
        <EntryHeading>Recent Entries</EntryHeading>
        {filteredEntries.map((entry) => (
          <EntryItem 
            key={entry._id} 
            onClick={() => handleEntryClick(entry._id)}
          >
            <EntryTitle>{entry.Location} - {entry.ACRegNo}</EntryTitle>
            <EntryDate>
              {new Date(entry.dateTime).toLocaleDateString()}
            </EntryDate>
          </EntryItem>
        ))}
      </RecentEntries>

      <ProfileButton onClick={handleProfileClick}>
        <FaUser />
        <span>Profile</span>
      </ProfileButton>
    </SidebarContainer>
  );
};

export default Sidebar;