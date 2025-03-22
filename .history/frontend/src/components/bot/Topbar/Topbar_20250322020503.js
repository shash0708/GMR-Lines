import React from 'react'
import './Topbar.css'
import { FaArrowLeft } from "react-icons/fa6";

const Topbar = () => {
  return (
    <div>
        <div className="topbar">
            <div className="date-container">
                <FaArrowLeft className="arrow-icon" />
                <span className="date-text">22-03-2025</span>
            </div>
        </div>
    </div>
  )
}

export default Topbar