// src/Pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password_hash, confirmPassword_hash } = formData;
    if (!name || !email || !password_hash || !confirmPassword_hash) {
      toast.error("All fields are required");
      return false;
    }
    if (password_hash !== confirmPassword_hash) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful!");
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white px-4">
      <ToastContainer />
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-black bg-opacity-30 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform focus:scale-105"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform focus:scale-105"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform focus:scale-105"
              onChange={handleChange}
              value={formData.password_hash}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform focus:scale-105"
              onChange={handleChange}
              value={formData.confirmPassword_hash}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all transform focus:scale-105 mt-4"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-300">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/Login')}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
