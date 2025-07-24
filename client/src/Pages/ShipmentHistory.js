// src/Pages/ShipmentHistory.js
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookShipment.css';

const ShipmentHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

  const downloadPDF = (booking, index) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('TradeRock Shipment Confirmation', 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${booking.fullName}`, 20, 40);
    doc.text(`Email: ${booking.email}`, 20, 50);
    doc.text(`User ID: ${booking.userId}`, 20, 60);
    doc.text(`Mineral: ${booking.mineral}`, 20, 70);
    doc.text(`Quantity: ${booking.quantity} ${booking.unit}`, 20, 80);
    doc.text(`Depot: ${booking.depot}`, 20, 90);
    doc.text(`Destination: ${booking.destination}`, 20, 100);
    doc.text(`Price: $${booking.price.toFixed(2)}`, 20, 110);
    doc.text(`Timestamp: ${new Date(booking.timestamp).toLocaleString()}`, 20, 120);

    doc.save(`Shipment_${booking.fullName}_${index + 1}.pdf`);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">📦 Shipment History</h3>
      {bookings.length === 0 ? (
        <div className="alert alert-info">No bookings found.</div>
      ) : (
        <div className="row">
          {bookings.map((booking, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{booking.fullName}</h5>
                  <p className="card-text"><strong>Email:</strong> {booking.email}</p>
                  <p className="card-text"><strong>User ID:</strong> {booking.userId}</p>
                  <p className="card-text"><strong>Mineral:</strong> {booking.mineral}</p>
                  <p className="card-text"><strong>Quantity:</strong> {booking.quantity} {booking.unit}</p>
                  <p className="card-text"><strong>Depot:</strong> {booking.depot}</p>
                  <p className="card-text"><strong>Destination:</strong> {booking.destination}</p>
                  <p className="card-text"><strong>Price:</strong> ${booking.price.toFixed(2)}</p>
                  <p className="card-text"><strong>Timestamp:</strong> {new Date(booking.timestamp).toLocaleString()}</p>
                  <button className="btn btn-outline-primary mt-2" onClick={() => downloadPDF(booking, index)}>
                    📄 Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShipmentHistory;
