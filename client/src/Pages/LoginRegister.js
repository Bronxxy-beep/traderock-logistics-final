import React, { useState } from 'react';
import './BookShipment.css';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password_hash: '', full_name: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(prev => !prev);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';
    const payload = isLogin
      ? { email: formData.email, password_hash: formData.password_hash }
      : { ...formData };

    const res = await fetch(`http://127.0.0.1:5000${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(isLogin ? 'Login successful!' : 'Registration successful!');
      if (isLogin) window.location.href = '/'; // redirect on login
    } else {
      setMessage(data.error || 'An error occurred');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3>{isLogin ? 'Login' : 'Register'}</h3>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="full_name" className="form-control" onChange={handleChange} required />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button>
        <button type="button" className="btn btn-link" onClick={toggleMode}>
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default LoginRegister;
