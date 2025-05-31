import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import '../styles/loginsignup.css';

const SmartClassroom = () => {

  const webcamRef = useRef(null);
  const [mode, setMode] = useState('register');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [Clicked, setClicked] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [attendanceDone, setattendanceDone] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setMessage('Image capture failed. Please try again.');
      return;
    }

    setCameraActive(true);
    setClicked(true);

    if (mode === 'attendance') {
      setTimeout(() => {
        setMessage(`Hello ${name || 'Student'}, your attendance is marked.`);
        setattendanceDone(true);
      }, 800);
    }
  };


  const handleSubmit = () => {
    if (!name) {
      setMessage('Please enter your name');
      return;
    }
    setMessage(`Student ${name} successfully registered.`);
    setRegistered(true);
  };


  const resetState = () => {
    setName('');
    setMessage('');
    setCameraActive(false);
    setClicked(false);
    setRegistered(false);
    setattendanceDone(false);
  };



  return (
    <div className="main">

      <div className="landing">

        <h1>
        {mode === 'register'
          ? 'Welcome to the Registration Page for Smart Classroom'
          : 'Welcome to the Smart Classroom System'}
        </h1>

        <div className="content">
          
          <div className="left-content">
   

            {!registered && !attendanceDone && (
              <p>
                {mode === 'register'
                  ? 'Please enter your name and come close to the camera'
                  : 'Please come close to the camera for marking attendance'}
              </p>
            )}

            {mode === 'register' && !registered && (
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="name"
              />
            )}

            <p className="message ">{message}</p>

            <div className="mode">

              {(!registered && !attendanceDone) && (
                <>
                  <button onClick={() => { setMode('register'); resetState(); }} className="mode-button">
                    Registration Mode
                  </button>
                  <button onClick={() => { setMode('attendance'); resetState(); }} className="mode-button">
                    Attendance Mode
                  </button>
                </>
              )}

              {registered && (
                <button onClick={() => { setMode('attendance'); resetState(); }} className="mode-button">
                  Attendance Mode
                </button>
              )}

            </div>

          </div>

          <div className="right-content">

            {!(registered || attendanceDone) && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={320}
                height={240}
                className={`webcam ${cameraActive ? 'webcam-active' : ''}`}
              />
            )}

            {!registered && !attendanceDone && (
              <div className="button-group">
                {!Clicked && (
                  <button onClick={capture} className="action-button">
                    {mode === 'register' ? 'Capture Image' : 'Mark Attendance'}
                  </button>
                )}
                {mode === 'register' && Clicked && !registered && (
                  <button onClick={handleSubmit} className="submit-button">
                    Submit
                  </button>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default SmartClassroom;