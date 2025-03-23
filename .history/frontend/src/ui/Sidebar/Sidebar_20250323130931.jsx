import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUser,FaFileExport,FaPlus } from 'react-icons/fa';
import axios from 'axios';
import URL from '../../components/config';
import { MdOutlineLibraryAdd } from "react-icons/md";
import {useSele}
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

  
  // Add dummy data
  const dummyEntries = [
    {
      _id: '1',
      Location: 'Mumbai Airport',
      ACRegNo: 'VT-ABC',
      dateTime: '2024-03-23T10:30:00'
    },
    {
      _id: '2',
      Location: 'Delhi Terminal 3',
      ACRegNo: 'VT-XYZ',
      dateTime: '2024-03-22T15:45:00'
    },
    {
      _id: '3',
      Location: 'Bangalore T2',
      ACRegNo: 'VT-123',
      dateTime: '2024-03-21T09:15:00'
    },
    {
      _id: '4',
      Location: 'Hyderabad RGIA',
      ACRegNo: 'VT-456',
      dateTime: '2024-03-20T14:20:00'
    },
    {
      _id: '5',
      Location: 'Chennai International',
      ACRegNo: 'VT-789',
      dateTime: '2024-03-19T11:00:00'
    }
  ];

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${URL}/logs/getlogs`, {
          headers: {
            'auth-token': localStorage.getItem('auth-token')
          }
        });
        setEntries( dummyEntries);
      } catch (error) {
        console.error('Error fetching entries:', error);
        setEntries(dummyEntries);

      }
    };
    fetchEntries();
  }, []);

  const handleExportClick = () => {
    navigate('/pdf');
  };

  const handleEntryClick = (id) => {
    setHighlightedId(id);
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
          <span>Export to PDF</span>
        </ActionButton>
      </ButtonGroup>

      <RecentEntries>
        <EntryHeading>Recent Entries</EntryHeading>
        {filteredEntries.map((entry) => (
          <EntryItem 
            key={entry._id} 
            onClick={() => handleEntryClick(entry._id)}
            isHighlighted={entry._id === highlightedId}
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