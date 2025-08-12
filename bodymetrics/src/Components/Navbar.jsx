import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png'; // Import the logo image

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    setIsLoggedIn(false);
    alert('User Logout Successfully');
    navigate('/'); 
  };

  return (
      <div className="navbar">
        <Link className='Link' to="/"><img src={logo} alt='BodyMetrics'/></Link>
        <div className="LinkTag">
          {!isLoggedIn && <Link className='links' to="/SignUp">SignUp</Link>}
          {!isLoggedIn && <Link className='links' to="/login">Login</Link>}
          <Link className="links" to="/bmi-calculator">BMI</Link>
          <Link className="links" to="/calorie">Calorie</Link>
          <Link className='links' to="/idealweight">IdealWeight</Link>
          {isLoggedIn && <Link className="links" to="/profile">Profile</Link>}
          {isLoggedIn && <button onClick={handleLogout} className="Loglink">Logout</button>}
        </div>
        </div>
    );
  }
  
  export default Navbar;