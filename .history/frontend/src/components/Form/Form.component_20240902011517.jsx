import React, { useState ,useRef} from 'react';
import { InputText } from 'primereact/inputtext'; 
import { Button } from 'primereact/button'; 
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast'; // Import Toast component
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import './Form.css'; // Import the CSS file
import useDocumentTitle from '../hooks/useDocumentTitle';

import MaskDemo from '../speedDail/SpeedDail.component';
const Form = () => {
    useDocumentTitle('Form Page'); // Set the document title for this page
    const [Id,setId]= useState(0);
    const [ToA, setToA] = useState('');
    const [reg, setReg] = useState('');
    const [ATA, setATA] = useState('');
    const [Wo, setWo] = useState('');
    const [Mt, setMt] = useState('');
    const [TOM, setTOM] = useState('');
    const [TOA, setTOA] = useState('');
    const [C, setC] = useState('');
    const [DU, setDU] = useState('');
    const [Supervisor, setSupervisor] = useState('');
    const toast = useRef(null); // Create a reference for Toast

    const cities = [
        { name: 'L', code: 'l' },
        { name: 'L', code: 'l' },
        { name: 'L', code: 'l' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Ensure these fields are properly defined in your component state or scope
        const logData = {Id, ToA, reg, ATA, Wo, Mt, TOM:TOM?.name,TOA:TOA?.name, C:C?.name, DU, Supervisor };
        
        try {
            const response = await fetch(import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import URL from '../config'; // Make sure this is the correct path

const Signup = (props) => {
  useDocumentTitle('Sign In'); // Set the document title for this page

  const [credentials, setCredentials] = useState({ AME: "", password: "", cpassword: "" });
  const [error, setError] = useState(null); // State to store error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { AME, password, cpassword } = credentials;

    // Check if passwords match
    if (password !== cpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${URL}api/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ AME, password })
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        alert("Account Created successfully");
        navigate('/');
      } else {
        setError("Signup failed. Please try again."); // Set error message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(null); // Clear error message on input change
  };

  return (
    <div className='container'>
      <h1>Signup to Continue to iNoteBook</h1>
      {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Error display */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="AME" className="form-label">AMEI NUMBER</label>
          <input
            type="text"
            className="form-control"
            name="AME"
            id="AME"
            value={credentials.AME}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={credentials.password}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
logs/createLog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')

                },
                body: JSON.stringify(logData),
            });
    
            // Check if the response is okay (status 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Success:', data);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Log successfully uploaded!' });

        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to upload log.' });

            console.error('Error:', error);
        }
    };
    
    
    return (
        <div className="cards">
            <Toast ref={toast} position="top-right" style={{width:'10px'}} /> {/* Add Toast component */}

            <form onSubmit={handleSubmit} className="form" style={{ width: '100%', maxWidth: '800px' }}>
            <div className="p-field">
                    <FloatLabel>
                        <InputText id="Id" value={Id} onChange={(e) => setId(e.target.value)} />
                        <label htmlFor="Id">Enter your Id</label>
                    </FloatLabel>
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <InputText id="ToA" value={ToA} onChange={(e) => setToA(e.target.value)} />
                        <label htmlFor="ToA">ToA</label>
                    </FloatLabel>
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <InputText id="reg" value={reg} onChange={(e) => setReg(e.target.value)} />
                        <label htmlFor="reg">Reg</label>
                    </FloatLabel>
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <InputText id="ATA" value={ATA} onChange={(e) => setATA(e.target.value)} />
                        <label htmlFor="ATA">ATA</label>
                    </FloatLabel>
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <InputText id="Wo" value={Wo} onChange={(e) => setWo(e.target.value)} />
                        <label htmlFor="Wo">Wo</label>
                    </FloatLabel>
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <InputText id="Mt" value={Mt} onChange={(e) => setMt(e.target.value)} />
                        <label htmlFor="Mt">Mt</label>
                    </FloatLabel>
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <Dropdown inputId="TOM" value={TOM} onChange={(e) => setTOM(e.value)} options={cities} optionLabel="name" className="w-full" />
                        <label htmlFor="TOM">TOM</label>
                    </FloatLabel>
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <Dropdown inputId="TOA" value={TOA} onChange={(e) => setTOA(e.value)} options={cities} optionLabel="name" className="w-full" />
                        <label htmlFor="TOA">TOA</label>
                    </FloatLabel>
                </div>
                <div className="p-field">
                <FloatLabel>
                    <Dropdown 
                        inputId="C" 
                        value={C} 
                        onChange={(e) => setC(e.value)} 
                        options={cities} 
                        optionLabel="name" 
                        className="w-full" 
                    />
                    <label htmlFor="C">C</label>
                </FloatLabel>
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <InputText id="DU" value={DU} onChange={(e) => setDU(e.target.value)} />
                        <label htmlFor="DU">DU</label>
                    </FloatLabel>
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <InputText id="Supervisor" value={Supervisor} onChange={(e) => setSupervisor(e.target.value)} />
                        <label htmlFor="Supervisor">Supervisor</label>
                    </FloatLabel>
                </div>
                
                <Button type="submit" label="Update Log" />
            </form>
            {/* <MaskDemo/> */}
        </div>
    );
};

export default Form;