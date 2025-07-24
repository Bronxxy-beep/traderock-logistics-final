import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Simulate a delayed dropdown (optional)
    const timeout = setTimeout(() => {
      setShowForm(true);
    }, 400); // delay before form drops down

    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 1000);
  };

  return (
    <div className="animated-bg w-screen h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="bubble-container">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              left: `${Math.random() * 100}vw`,
              bottom: `-${Math.random() * 100}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 30}s`,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ duration: 2.0, ease: "easeOut" }}
            className="max-w-md w-full p-6 sm:p-10 bg-white shadow-2xl rounded-xl z-10"
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Contact Us</h2>

            {submitted ? (
              <motion.div
                className="bg-green-100 text-green-800 p-4 rounded text-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                ✅ Thank you, <strong>{formData.name}</strong>! We'll get in touch soon.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full border p-3 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full border p-3 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full border p-3 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className="w-full border p-3 rounded h-28 resize-none focus:outline-none focus:ring focus:ring-blue-300"
                  value={formData.message}
                  onChange={handleChange}
                />
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800 transition"
                >
                  Submit
                </motion.button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Existing content */}

<footer className="bg-slate-900 text-gray-400 text-center py-4 mt-12 relative z-10">
  <p>© 2025 Traderock Logistics | All Rights Reserved</p>
</footer>

    </div>
  );
}

export default Contact;
