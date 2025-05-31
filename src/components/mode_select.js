
import React from 'react';
import bg from '../assests/opi.jpeg';
import ghibli from '../assests/classroom.jpg';
import '../styles/mainpage.css';

const ModeSelect = ({ onSelect }) => (

  <div className="mainpage-wrapper">

    <img src={bg} alt="bg" className="bg-img" />

    <div className="box">

      <div className="left-content">

        <h2>Select Mode</h2>
        <div className="mode">
          <button className="mode-button" onClick={() => onSelect('register')}>Registration Mode</button>
          <button className="mode-button" onClick={() => onSelect('attendance')}>Attendance Mode</button>
        </div>

      </div>

      <div className="right-content">
        <img src={ghibli} alt="ghibili" />
      </div>

    </div>
    
  </div>
);

export default ModeSelect;
