import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DCard } from './DataCard';
import './Data.css'; // Assuming you have a CSS file for styling
import MaskDemo from '../speedDail/SpeedDail.component';
import URL from '../config';
const 









































Data = () => {
    const { id } = useParams(); // Get the id from the URL
    const [log, setLog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLog = async () => {
            try {
            const response = await fetch(`${URL}/getlogs/logs/${id}`, {
                method: 'GET', // Specify the method if it's not GET
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            });
            
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLog(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLog();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>; // Add a loading spinner or animation
    }

    if (error) {
        return <div className="error">{error}</div>; // Display error message
    }

    return (
        <div className='card-container'>
            {log ? (
                <DCard key={log.Id} title={`Log ID: ${log.Id}`} className="log-card">
                    <div className="log-details">
                        <div className="column">
                            <p><strong>Date:</strong> {new Date(log.createdAt).toLocaleDateString()}</p>
                            <p><strong>ToA:</strong> {log.ToA}</p>
                            <p><strong>Reg:</strong> {log.reg}</p>
                            <p><strong>ATA:</strong> {log.ATA}</p>
                            <p><strong>Wo:</strong> {log.Wo}</p>
                        </div>
                        <div className="column">
                            <p><strong>Mt:</strong> {log.Mt}</p>
                            <p><strong>TOM:</strong> {log.TOM}</p>
                            <p><strong>TOA:</strong> {log.TOA}</p>
                            <p><strong>C:</strong> {log.C}</p>
                            <p><strong>DU:</strong> {log.DU}</p>
                            <p><strong>Supervisor:</strong> {log.Supervisor}</p>
                        </div>
                    </div>
                </DCard>
            ) : (
                <div className="no-data">No log found for the given ID.</div>
            )}
            <div>
            <MaskDemo/>
            </div>

        </div>
    );
}

export default Data;
