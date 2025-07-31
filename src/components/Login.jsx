import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/view'); // Redirect to View page on successful login
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Top Navbar */}
      <nav className="d-flex align-items-center px-4 py-2">
        <img
          src={logo}
          alt="Logo"
          style={{ height: '40px' }}
        />
        <h5 className="ms-2 fw-bold text-primary m-0">VCC List</h5>
      </nav>

      {/* Login Card */}
      <div className="d-flex flex-grow-1 justify-content-center align-items-center">
        <div
          className="bg-white p-5 rounded shadow"
          style={{ width: '100%', maxWidth: '500px' }}
        >
          <div className="text-center mb-4">
            <div className="d-flex justify-content-center align-items-center">
              <img src={logo} alt="Logo" style={{ height: '40px' }} />
              <h5 className="ms-2 mt-2 text-primary fw-bold">VCC LIST</h5>
            </div>
            <h3 className="fw-bold text-primary mt-3">WELCOME BACK</h3>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button className="btn btn-primary rounded-pill fw-bold" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;