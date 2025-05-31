import React, { useState } from 'react';
import Home from './components/home';
import ModeSelect from './components/mode_select';
import Registration from '../src/components/registration';
import Attendance from '../src/components/attendance';

const ClassroomApp = () => {
  const [page, setpage] = useState('home'); 

  return (
    <>
      {page === 'home' && <Home onStart={() => setpage('mode')} />}
      {page === 'mode' && <ModeSelect onSelect={setpage} />}
      {page === 'register' && <Registration />}
      {page === 'attendance' && <Attendance />}
    </>
  );
};

export default ClassroomApp;