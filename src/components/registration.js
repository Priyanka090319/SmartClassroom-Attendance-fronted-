
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import bg from '../assests/opi.jpeg';
import '../styles/loginsignup.css';

const Registration = () => {
  const webcamRef = useRef(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [captureClicked, setCaptureClicked] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setMessage('Image capture failed. Please try again.');
      return;
    }
    setCameraActive(true);
    setCaptureClicked(true);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setMessage('Please enter your name.');
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setMessage('Image capture failed. Please try again.');
      return;
    }

     try {
      // Convert base64 to Blob
      const blob = await fetch(imageSrc).then(res => res.blob());

      const formData = new FormData();
      formData.append("file", blob, "image.jpg");
      formData.append("name", name.trim());

      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`Hello ${result.name || name},You are successfully registered.`);
        setRegistered(true);
      } else {
        setMessage(`Registration failed: ${result.detail || 'Unknown error'}`);
      }

    } catch (error) {
      setMessage(`Error connecting to backend: ${error.message}`);
    }
  };

  return (
    <div className="main">
      <img src={bg} alt="bg" className="bg-img" />

      <div className="landing">
        <h1>Welcome to the Registration Page for Smart Classroom</h1>

        {!registered && <p>Please enter your name and come close to the camera</p>}

        <div className="content">
          <div className="left-content">
            {!registered && (
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                onClick={() => setShowWebcam(true)}
                className="name"
              />
            )}

            {!registered && (
              <div className="button-group">
                {!captureClicked && showWebcam && (
                  <button onClick={capture} className="action-button">
                    Capture Image
                  </button>
                )}
                {captureClicked && (
                  <button onClick={handleSubmit} className="submit-button">
                    Submit
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="right-content">
            {!registered && showWebcam && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={320}
                height={240}
                className={`webcam ${cameraActive ? 'webcam-active' : ''}`}
              />
            )}
          </div>
        </div>

        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Registration;
