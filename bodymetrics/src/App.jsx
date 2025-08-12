import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import CalorieCalculator from './Components/CalorieCalculator';
import Calculation from './Components/Calculation';
import M1 from './Components/M1';
import Profile from './Components/Profile';
import IdealWeightCalculator from './Components/IdealWeightCalculator';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<M1 />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/calorie' element={<CalorieCalculator />} />
        <Route path="/bmi-calculator" element={<Calculation />} />
        <Route path='/idealweight' element={<IdealWeightCalculator />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
