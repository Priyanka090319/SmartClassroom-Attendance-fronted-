import React from 'react';
import ghibli from '../assests/classroom.jpg';
import bg from '../assests/opi.jpeg';
import '../styles/mainpage.css';

const home = ({ onStart }) => (

  <div className="mainpage-wrapper">

    <img src={bg} alt="bg" className="bg-img" />
    
    <div className="box">

      <div className="left-content">
        <h1>Welcome to Smart Classroom</h1>
        <button onClick={onStart}>Get Started</button>
      </div>

      <div className="right-content">
        <img src={ghibli} alt="ghibili" />
      </div>

    </div>
    
  </div>
);

export default home;