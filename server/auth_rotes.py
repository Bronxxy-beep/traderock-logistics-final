from flask import Blueprint, request, jsonify, session
from models import db, User

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400
    user = User(email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered"}), 201

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        session['user_id'] = user.id
        return jsonify({"message": "Login successful", "user_id": user.id}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@auth_bp.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out"}), 200

@auth_bp.route('/api/user', methods=['GET'])
def get_current_user():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    user = User.query.get(session['user_id'])
    return jsonify({"email": user.email})
