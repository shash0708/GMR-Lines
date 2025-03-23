import React,{useState,useRef, useEffect} from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaFileExport,FaBars } from 'react-icons/fa';
import Button from '../CustomButton/Button';
import Sidebar from '../Sidebar/Sidebar';

const PageContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100vh'
});
const HamburgerButton = styled('button')(({ isOpen }) => ({
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'none',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 100,
    display: isOpen ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  }));
  
  const SidebarWrapper = styled('div')(({ isOpen }) => ({
    position: 'absolute',
    left: isOpen ? 0 : '-260px',
    top: 0,
    height: '100%',
    transition: 'left 0.3s ease',
    zIndex: 99
  }));
const Title = styled('h1')({
    color: '#FFFFFF',
    fontSize: '3rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '2rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
  });
  
const MainContent = styled('div')({
  flex: 1,
  backgroundColor: '#343541',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '15vh'
});

const ButtonGroup = styled('div')({
  display: 'flex',
  gap: '1rem',
  marginTop: '2rem'
});


function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      function handleClickOutside(event) {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setIsSidebarOpen(false);
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
        <PageContainer>
        <HamburgerButton onClick={toggleSidebar} isOpen={isSidebarOpen}>
          <FaBars />
        </HamburgerButton>
        
        <SidebarWrapper ref={sidebarRef} isOpen={isSidebarOpen}>
          <Sidebar />
        </SidebarWrapper>
  
        {isSidebarOpen && (
          <div 
            className="sidebar-overlay" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
  
        <MainContent>
          <Title>Welcome To AirCrew</Title>
          <ButtonGroup>
            <Button 
              icon={FaPlus}
              text="Add New Entry"
              onClick={handleAddNew}
            />
            <Button 
              icon={FaFileExport}
              text="Export Data"
              onClick={handleExport}
            />
          </ButtonGroup>
        </MainContent>
      </PageContainer>
    );
  }
  
  export default Home;

