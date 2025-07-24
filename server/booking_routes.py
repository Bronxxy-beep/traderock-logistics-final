from flask import Blueprint, request, jsonify, session
from models import db, Booking, Mineral, Destination, User

booking_bp = Blueprint('booking_bp', __name__)

@booking_bp.route('/api/bookings', methods=['POST'])
def create_booking():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    data = request.json
    booking = Booking(
        quantity=data['quantity'],
        unit=data['unit'],
        depot=data['depot'],
        destination=data['destination'],
        mineral=data['mineral'],
        price=data['price'],
        user_id=session['user_id']
    )
    db.session.add(booking)
    db.session.commit()
    return jsonify({"message": "Booking created"}), 201

@booking_bp.route('/api/my-bookings', methods=['GET'])
def user_bookings():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    bookings = Booking.query.filter_by(user_id=session['user_id']).all()
    return jsonify([
        {
            "quantity": b.quantity,
            "unit": b.unit,
            "depot": b.depot,
            "destination": b.destination,
            "mineral": b.mineral,
            "price": b.price,
            "timestamp": b.timestamp.strftime('%Y-%m-%d %H:%M')
        } for b in bookings
    ])

@booking_bp.route('/api/minerals', methods=['GET'])
def get_minerals():
    minerals = Mineral.query.filter_by(in_stock=True).all()
    return jsonify([m.name for m in minerals])

@booking_bp.route('/api/destinations', methods=['GET'])
def get_destinations():
    destinations = Destination.query.all()
    return jsonify([d.name for d in destinations])
