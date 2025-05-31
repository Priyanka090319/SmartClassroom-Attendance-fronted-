/*import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import bg from '../assests/opi.jpeg';
import '../styles/loginsignup.css';

const Attendance = () => {

  const webcamRef = useRef(null);
  const [message, setMessage] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const backendUrl = 'http://127.0.0.1:8000';

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setMessage('Image capture failed. Try again.');
      return;
    }

    setCameraActive(true);

    setTimeout(() => {
      setAttendanceMarked(true);
      setMessage('Hello Student, your attendance is marked.');
    }, 800);
  };

  return (
    <div className="main">

      <img src={bg} alt="bg" className="bg-img" />

      <div className="landing">
        
        <h1>Welcome to the Smart Classroom System</h1>
        {!attendanceMarked && <p>Please come close to the camera for marking attendance</p>}

        {!attendanceMarked && (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
            className={`webcam ${cameraActive ? 'webcam-active' : ''}`}
          />
        )}

        {!attendanceMarked && (
          <div className="button-group">
            <button onClick={capture} className="action-button">
              Mark Attendance
            </button>
          </div>
        )}

        <p className="message">{message}</p>

      </div>
    </div>
  );
};

export default Attendance;  */

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import bg from '../assests/opi.jpeg';
import '../styles/loginsignup.css';

const Attendance = () => {
  const webcamRef = useRef(null);
  const [message, setMessage] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const backendUrl = 'http://127.0.0.1:8000'; // Make sure your backend is running

  const sendImageToBackend = async (imageBlob) => {
    const formData = new FormData();
    formData.append("file", imageBlob);

    try {
      const response = await fetch(`${backendUrl}/attendance/`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        // If backend sends error, show the message
        setMessage(result.message || 'Failed to mark attendance.');
      } else {
        setMessage(result.message);
        setAttendanceMarked(true);
      }
    } catch (error) {
      setMessage('Error marking attendance: ' + error.message);
    }
  };

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setMessage('Image capture failed. Try again.');
      return;
    }

    setCameraActive(true);

    // Convert base64 to Blob
    const res = await fetch(imageSrc);
    const imageBlob = await res.blob();

    // Send to backend
    await sendImageToBackend(imageBlob);
  };

  return (
    <div className="main">
      <img src={bg} alt="bg" className="bg-img" />

      <div className="landing">
        <h1>Welcome to the Smart Classroom System</h1>
        {!attendanceMarked && <p>Please come close to the camera for marking attendance</p>}

        {!attendanceMarked && (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
            className={`webcam ${cameraActive ? 'webcam-active' : ''}`}
          />
        )}

        {!attendanceMarked && (
          <div className="button-group">
            <button onClick={capture} className="action-button">
              Mark Attendance
            </button>
          </div>
        )}

        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Attendance;


      