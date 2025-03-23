import './App.css';
import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import { PrimeReactProvider } from 'primereact/api';
import Home from '../src/components/Home/Home.component';
import Form from './components/Form/Form.component';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chatwindow from './components/bot/Chatwindow';
import Profile from './components/Profile/Profile.jsx'
import Cards from './components/Card/Card.component';
import Data from './components/Data/Data.component';
import Navbar from './components/Header/Header.component';
import EditProfile from './components/ProfileEdit/ProEdit.jsx';
import Login from './components/Login/Login.component';
import Signup from './components/SignUp/Signup.component';
import PdfComponent from './components/Pdf/PdfComponent';
import { LogsProvider } from './context/LogContext';
import Footer from './components/Footer/Footer.component';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useLocation } from 'react-router-dom';
import Logup from './components/Update/Update.jsx'
const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

    <LogsProvider>
      <PrimeReactProvider>
        <Router>
          <Content />
          <ToastContainer /> {/* Place this once in your app */}

        </Router>
      </PrimeReactProvider>
      </LogsProvider>
      </LocalizationProvider>
  );
};

const Content = () => {
  const location = useLocation();
  var [showFooter, setShowFooter] = useState(false);

  // Check if the current path is "/form"
  // showFooter = location.pathname !== "/form" ;
  // showFooter = location.pathname !== "/log/:id";


   
  // const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    // Hide the footer for specific paths
    const hideFooterPaths = ["/form", "/log","/signup","/bot"];

    // Check if the current path matches any path where the footer should be hidden
    const shouldShowFooter = !hideFooterPaths.some((path) =>
      location.pathname.startsWith(path)
    );

    setShowFooter(shouldShowFooter);
  }, [location.pathname]); 
   

  // This function will check the scroll position
  // const handleScroll = () => {
  //   // Show the footer if the user scrolls down more than 100px
  //   if (window.scrollY > 100) {
  //     setShowFooter(true);
  //   } else {
  //     setShowFooter(false);
  //   }
  // };

  // useEffect(() => {
  //   // Add the scroll event listener when the component mounts
  //   window.addEventListener('scroll', handleScroll);

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []); // Empty dependency array ensures this runs only once when the component mounts


  return (
    <>
      <Routes>
        {/* <Navbar/> */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/form" element={<Form />} />
        <Route path="/bot" element={<Chatwindow />} />
        <Route parth="/new" element= {<Home/>}/>
        <Route path="/past-records" element={<Cards />} /> 
        {/* <Route path="/log/:id" element={<Data />} /> */}
        <Route path="/pdf" element={<PdfComponent />} />
        <Route path="/log/:id"   element={<Logup/>}/>
        <Route path="/profile"  element={<Profile/>}/>
        <Route path="/edit" element={<EditProfile/>}/>
      </Routes>
      {showFooter && <Footer />} {/* Conditionally render the footer */}
    </>
  );
};

export default App;
