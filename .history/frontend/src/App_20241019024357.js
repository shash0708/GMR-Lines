import './App.css';
import {use}
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import { PrimeReactProvider } from 'primereact/api';
import Home from '../src/components/Home/Home.component';
import Form from './components/Form/Form.component';
import Cards from './components/Card/Card.component';
import Data from './components/Data/Data.component';
import Navbar from './components/Header/Header.component';
import Login from './components/Login/Login.component';
import Signup from './components/SignUp/Signup.component';
import PdfComponent from './components/Pdf/PdfComponent';
import { LogsProvider } from './context/LogContext';
import Footer from './components/Footer/Footer.component';
import { useLocation } from 'react-router-dom';
import Logup from './components/Update/Update.jsx'
const App = () => {
  return (
    <LogsProvider>
      <PrimeReactProvider>
        <Router>
          <Content />
        </Router>
      </PrimeReactProvider>
    </LogsProvider>
  );
};

const Content = () => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(false);

  // Check if the current path is "/form"
   showFooter = location.pathname !== "/form";


  // This function will check the scroll position
  const handleScroll = () => {
    // Show the footer if the user scrolls down more than 100px
    if (window.scrollY > 100) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
  };

  useEffect(() => {
    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts


  return (
    <>
      <Routes>
        {/* <Navbar/> */}
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/form" element={<Form />} />
        <Route path="/past-records" element={<Cards />} /> 
        <Route path="/data/:id" element={<Data />} />
        <Route path="/pdf" element={<PdfComponent />} />
        <Route path="/edit"  element={<Logup/>}/>
      </Routes>
      {showFooter && <Footer />} {/* Conditionally render the footer */}
    </>
  );
};

export default App;