import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  
const handleLogin = async (e) => {
  e.preventDefault();

  const { email, password } = user;

  try {
   const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
});

    const data = await res.json();

    if (res.ok && data.success) {
  console.log("Login Successful:", data);
  alert("Login Successful!");
  localStorage.setItem('id', data.user.id);
  localStorage.setItem('user', JSON.stringify(data.user));
  navigate("/profile");
  window.location.reload();
}
    else {
      setError(data.message || "Invalid email or password");
      console.log(data);
    }

  } catch (error) {
    console.error("Login Error:", error);
    setError("Something went wrong. Please try again later.");
  }
};

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
      
        <label>Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>Password:
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <button className='btn' type="submit" >Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
