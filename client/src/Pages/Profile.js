// src/Pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Background.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [user, setUser] = useState(null); // Logged-in user state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? '/api/login' : '/api/signup';

    // Basic validation
    if (!formData.email || !formData.password_hash) {
      toast.error("Email and password are required");
      return;
    }

    if (!isLogin && formData.password_hash !== formData.confirmPassword_hash) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`${isLogin ? "Login" : "Signup"} successful`);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info("Logged out successfully");
  };

  const toggleForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <ToastContainer />

      {user ? (
        <div className="text-center">
          <h2>Welcome, {user.name || user.email}</h2>
          <button
            onClick={handleLogout}
            className="login-button mt-6 w-full"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password_hash}
              onChange={handleChange}
              required
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword_hash}
                onChange={handleChange}
              />
            )}
            <button type="submit" className="login-button">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <span onClick={toggleForm}>
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default Profile;
