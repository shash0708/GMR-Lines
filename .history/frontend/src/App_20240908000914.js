import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import { PrimeReactProvider } from 'primereact/api';
import Home from '../src/components/Home/Home.component'
import Form from './components/Form/Form.component';
import Cards from './components/Card/Card.component';
import Data from './components/Data/Data.component';
import Navbar from './components/Header/Header.component'
import Login from './components/Login/Login.component';
import Signup from './components/SignUp/Signup.component';
import PdfComponent from './components/Pdf/PdfComponent';
function App() {
  return (
    <PrimeReactProvider>
<Router>
<Navbar />

      <Routes>
      {/* <Navbar/> */}

        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/form" element={<Form />} />
        <Route path="/past-records" element={<Cards />} /> 
        <Route path="/data/:id" element={<Data />} />
        <Route path=""
      </Routes>
    </Router>
</PrimeReactProvider>
  );
}

export default App;