import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Topbar.css'
import { FaArrowLeft } from "react-icons/fa6"

const Topbar = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/past-records')
  }

  return (
    <div class="">
        <div className="topbar">
            <div className="date-container">
                <FaArrowLeft 
                  className="arrow-icon" 
                  onClick={handleBackClick}
                  style={{ cursor: 'pointer' }}
                />
                <span className="date-text">22-03-2025</span>
            </div>
        </div>
    </div>
  )
}

export default Topbar