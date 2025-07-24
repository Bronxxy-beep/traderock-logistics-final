import React, { useState, useEffect } from 'react';
import './BookShipment.css';
import { FaCheckCircle, FaMoon, FaSun, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BookShipment = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mineral: '',
    quantity: '',
    unit: 'kg',
    depot: '',
    destination: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [price, setPrice] = useState(0);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme === 'light' ? 'light-mode' : 'dark-mode');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const calculatePrice = (qty, unit) => {
    const ratePerKg = 1.5;
    const weight = unit === 'tonnes' ? qty * 1000 : qty;
    return weight * ratePerKg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPrice = calculatePrice(Number(formData.quantity), formData.unit);
    setPrice(totalPrice);
    const order = {
      ...formData,
      price: totalPrice,
      timestamp: new Date().toISOString()
    };
    const existing = JSON.parse(localStorage.getItem('bookings')) || [];
    localStorage.setItem('bookings', JSON.stringify([...existing, order]));
    setSubmitted(true);
  };

  const downloadPDF = () => {
    const order = {
      ...formData,
      price,
      timestamp: new Date().toLocaleString()
    };
    const text = `Shipment Booking Confirmation\n\nName: ${order.fullName}\nEmail: ${order.email}\nMineral: ${order.mineral}\nQuantity: ${order.quantity} ${order.unit}\nDepot: ${order.depot}\nDestination: ${order.destination}\nTotal Price: $${order.price.toFixed(2)}\nDate: ${order.timestamp}`;
    const blob = new Blob([text], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'shipment_confirmation.pdf';
    link.click();
  };

  return (
    <>
      <div className="animated-background"></div>
      <div className="bubbles">
        {[...Array(20)].map((_, i) => <div key={i} className="bubble"></div>)}
      </div>
      <div className="wave"></div>
      <div className="position-fixed top-0 end-0 p-3 z-10" style={{ zIndex: 1000 }}>
        <button
          className="btn btn-outline-light"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          title="Toggle Theme"
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        {!submitted ? (
          <form className="booking-form-wrapper" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Book Your Shipment</h2>
            {['fullName', 'email', 'mineral', 'quantity'].map(field => (
              <input
                key={field}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                className="form-control mb-3 zoom-input"
                onChange={handleChange}
                required
              />
            ))}
            <select className="form-control mb-3" name="unit" onChange={handleChange}>
              <option value="kg">Kilograms</option>
              <option value="tonnes">Tonnes</option>
            </select>
            <input className="form-control mb-3" name="depot" placeholder="Depot (e.g. Mombasa)" onChange={handleChange} required />
            <input className="form-control mb-3" name="destination" placeholder="Destination" onChange={handleChange} required />
            <button type="submit" className="btn btn-primary w-100">Submit</button>
            <div className="mt-3 text-center">
              <Link to="/shipment-history" className="btn btn-outline-light">View Shipment History</Link>
            </div>
          </form>
        ) : (
          <div className="confirmation-wrapper text-center">
            <FaCheckCircle className="text-success" size={48} />
            <h3 className="mt-3">Shipment Booked Successfully!</h3>
            <p>Total Price: <strong>${price.toFixed(2)}</strong></p>
            <button className="btn btn-success mt-3" onClick={downloadPDF}>
              <FaDownload className="me-2" />Download Confirmation
            </button>
            <div className="mt-3">
              <Link to="/shipment-history" className="btn btn-outline-light">View Shipment History</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookShipment;
