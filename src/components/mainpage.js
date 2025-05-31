import React, { useState } from 'react';
import LoginPage from './login_signup';
import '../styles/mainpage.css';

const ClassroomApp = () => {
  const [started, setStarted] = useState(false);

  return (
    
    <div className="mainpage-wrapper">
      {started === false ? (

        <div className="box">

          <div className="left-content">
            <h1>Welcome to Smart Classroom</h1>
            <button onClick={() => setStarted(true)}>Get Started</button>
          </div>

          <div className="right-content">
            <img src="/classroom.jpg" alt="classroom" />
          </div>

        </div>
      ) : ( <LoginPage />  )}

    </div>
  );
};

export default ClassroomApp;