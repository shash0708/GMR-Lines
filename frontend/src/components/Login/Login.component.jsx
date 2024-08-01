import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';


const Login = (props) => {
    useDocumentTitle('Login'); // Set the document title for this page

    const [credentials, setCredentials] = useState({AME: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://gmr-lines.onrender.com/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({AME: credentials.AME, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);   
            alert("Logged in Successfully","success");
            navigate('/');

          
      }
      else{
        alert("Invalid Credentials","danger");
      }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container'>
                  <h1>Login to Continue to iNoteBook</h1>
            <form   onSubmit={handleSubmit}>
            <div className="mb-3">
          <label htmlFor="AME" className="form-label">AMEI NUMBER</label>
          <input
            type="text"
            className="form-control"
            name="AME"
            id="AME"
            value={credentials.AME}
            onChange={onChange}
          />
        </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login