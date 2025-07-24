import React, { useEffect, useState } from 'react';

const TrackShipments = ({ email }) => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetch(`/track/${email}`)
      .then(res => res.json())
      .then(setShipments)
      .catch(console.error);
  }, [email]);

  return (
    <div className="container mt-5">
      <h3>Your Shipment History</h3>
      {shipments.length > 0 ? (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Mineral</th>
              <th>Quantity</th>
              <th>Destination</th>
              <th>Price</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s, i) => (
              <tr key={i}>
                <td>{s.mineral}</td>
                <td>{s.quantity_kg} kg</td>
                <td>{s.destination}</td>
                <td>${s.price}</td>
                <td>{s.status}</td>
                <td>{new Date(s.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No shipments found.</p>
      )}
    </div>
  );
};

export default TrackShipments;
