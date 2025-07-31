// src/Pages/BookShipment.js
import React, { useState, useEffect } from 'react';

const BookShipment = () => {
  const [minerals, setMinerals] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    quantity: '',
    unit: 'kg',
    depot: '',
    destination: '',
    mineral: ''
  });
  const [step, setStep] = useState(0);
  const [price, setPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/minerals')
      .then(res => res.json())
      .then(setMinerals);

    fetch('http://127.0.0.1:5000/api/destinations')
      .then(res => res.json())
      .then(setDestinations);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calculatePrice = () => {
    const qty = parseFloat(formData.quantity);
    const rate = formData.unit === 'kg'
      ? formData.depot === 'Nairobi' ? 0.5 : 0.6
      : formData.depot === 'Nairobi' ? 500 : 600;
    setPrice(qty * rate);
  };

  const handleNext = () => {
    if (step === 3) calculatePrice();
    setStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    const res = await fetch('http://127.0.0.1:5000/api/bookings', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, price }),
    });
    if (res.ok) setSubmitted(true);
  };

  if (submitted) {
    return <div className="container mt-5 alert alert-success">✅ Booking confirmed!</div>;
  }

  return (
    <div className="container mt-5">
      <h3>Book a Shipment</h3>
      {step === 0 && (
        <>
          <div className="mb-3">
            <label>Full Name</label>
            <input name="full_name" type="text" className="form-control" onChange={handleChange} value={formData.full_name} required />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input name="email" type="email" className="form-control" onChange={handleChange} value={formData.email} required />
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <div className="mb-3">
            <label>Mineral</label>
            <select name="mineral" className="form-select" onChange={handleChange} value={formData.mineral}>
              <option value="">--Select Mineral--</option>
              <option value="Limestone">Limestone</option>
              <option value="Flourite">Flourite</option>
              <option value="Bauxite">Bauxite</option>
              <option value="Gypsum">Gypsum</option>
              <option value="Barite">Barite</option>
              <option value="Copper">Copper</option>
              <option value="Iron Ore">Iron Ore</option>
              <option value="Coal">Coal</option>
              <option value="Zinc">Zinc</option>
              <option value="Lead">Lead</option>
              <option value="Manganese">Manganese</option>
              <option value="Cobalt">Cobalt</option>
              <option value="Nickel">Nickel</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Platinum">Platinum</option>
              <option value="Diamond">Diamond</option>
              <option value="Tantalum">Tantalum</option>
              <option value="Tin">Tin</option>
              <option value="Lithium">Lithium</option>
              {minerals.map((m, i) => <option key={i} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label>Quantity</label>
            <input name="quantity" type="number" className="form-control" onChange={handleChange} value={formData.quantity} />
          </div>
          <div className="mb-3">
            <label>Unit</label>
            <select name="unit" className="form-select" onChange={handleChange} value={formData.unit}>
              <option value="kg">Kilograms</option>
              <option value="tonne">Tonnes</option>
            </select>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="mb-3">
            <label>Depot</label>
            <select name="depot" className="form-select" onChange={handleChange} value={formData.depot}>
              <option value="">--Select Depot--</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Mombasa">Mombasa</option>
              <option value="Kisumu">Kisumu</option>
              <option value="Eldoret">Eldoret</option>
              <option value="Nakuru">Nakuru</option>
              <option value="Athiriver">Athiriver</option>
              <option value="Machakos">Machakos</option>
            </select>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <div className="mb-3">
            <label>Destination</label>
            <select name="destination" className="form-select" onChange={handleChange} value={formData.destination}>
              <option value="">--Select Destination--</option>
              {destinations.map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>
          </div>
        </>
      )}
      {step === 4 && (
        <>
          <h5>Confirm</h5>
          <p><strong>Name:</strong> {formData.full_name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Mineral:</strong> {formData.mineral}</p>
          <p><strong>Quantity:</strong> {formData.quantity} {formData.unit}</p>
          <p><strong>Depot:</strong> {formData.depot}</p>
          <p><strong>Destination:</strong> {formData.destination}</p>
          <p><strong>Price:</strong> ${price.toFixed(2)}</p>
          <button className="btn btn-success" onClick={handleSubmit}>Submit Booking</button>
        </>
      )}

      {step < 4 && (
        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-primary" onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
};

export default BookShipment;
