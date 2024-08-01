import React from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import { useNavigate } from 'react-router-dom';

const Buttons = ({ text, to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <div>
            <div  style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '80px', // Adjust the top margin as needed
                        marginBottom: '8px', // Adjust the bottom margin as needed
                        fontSize: '0.875rem', // Adjust the font size to make the button smaller
                        padding: '0.5rem 1rem', // Adjust padding for button size
                    }}>
                <Button
                    href="https://react.dev"
                    onClick={handleClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-button font-bold"
                   
                >
                    {text}
                </Button>
            </div>
        </div>
    );
};

export default Buttons;
