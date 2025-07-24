from flask import Flask, render_template, redirect, url_for, session, request, flash, jsonify
from models import db, User, Mineral, Shipment, Destination, Booking
from forms import Step1Form, Step2Form, Step3Form, LoginForm
from werkzeug.security import check_password_hash, generate_password_hash
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'your_secret_key_here'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize DB
db.init_app(app)
migrate = Migrate(app, db)
# Create DB tables
# @app.before_first_request
# def create_tables():
#     with app.app_context():
#         db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password_hash')
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password_hash, password):
            session['email'] = user.email
            session['user_id'] = user.id
            return jsonify({"message": "Login successful", "role": user.role}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    return render_template('login.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing data"}), 400

    email = data.get("email")
    password_hash = data.get("password_hash")
    full_name = data.get("full_name")

    if not email or not password_hash or not full_name:
        return jsonify({"error": "All fields are required."}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists."}), 400

    hashed_password = generate_password_hash(password_hash)
    new_user = User(email=email, password_hash=hashed_password, full_name=full_name, role='customer')
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully."}), 201

@app.route('/logout')
def logout():
    session.clear()
    return jsonify({"message": "Logged out."})

@app.route('/minerals')
def minerals():
    all_minerals = Mineral.query.all()
    return render_template('minerals.html', minerals=all_minerals)

@app.route('/api/minerals')
def api_minerals():
    minerals = Mineral.query.filter_by(in_stock=True).all()
    return jsonify([m.name for m in minerals])

@app.route('/api/destinations')
def api_destinations():
    destinations = Destination.query.all()
    return jsonify([d.name for d in destinations])

@app.route('/api/bookings', methods=['POST'])
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

@app.route('/api/my-bookings')
def get_my_bookings():
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

@app.route('/book/step1', methods=['GET', 'POST'])
def book_step1():
    form = Step1Form()
    if form.validate_on_submit():
        session['full_name'] = form.full_name.data
        session['email'] = form.email.data
        return redirect(url_for('book_step2'))
    return render_template('book_step1.html', form=form)

@app.route('/book/step2', methods=['GET', 'POST'])
def book_step2():
    form = Step2Form()
    form.mineral.choices = [(m.id, m.name) for m in Mineral.query.filter_by(in_stock=True).all()]
    if form.validate_on_submit():
        session['mineral_id'] = form.mineral.data
        session['quantity'] = form.quantity.data
        return redirect(url_for('book_step3'))
    return render_template('book_step2.html', form=form)

@app.route('/book/step3', methods=['GET', 'POST'])
def book_step3():
    form = Step3Form()
    if form.validate_on_submit():
        user = User.query.filter_by(email=session['email']).first()
        if not user:
            password_hash = generate_password_hash('defaultpassword')
            user = User(full_name=session['full_name'], email=session['email'], role='customer', password_hash=password_hash)
            db.session.add(user)
            db.session.commit()

        mineral = Mineral.query.get(session['mineral_id'])
        quantity = session['quantity']
        price = mineral.price_per_kg * quantity

        shipment = Shipment(
            user_id=user.id,
            mineral_id=mineral.id,
            quantity_kg=quantity,
            destination=form.destination.data,
            price=price
        )
        db.session.add(shipment)
        db.session.commit()
        return redirect(url_for('confirmation', shipment_id=shipment.id))
    return render_template('book_step3.html', form=form)

@app.route('/confirmation/<int:shipment_id>')
def confirmation(shipment_id):
    shipment = Shipment.query.get_or_404(shipment_id)
    return render_template('confirmation.html', shipment=shipment)

@app.route('/track/<email>')
def track(email):
    user = User.query.filter_by(email=email).first()
    shipments = user.history if user else []
    return render_template('track.html', shipments=shipments)

@app.route('/admin')
def admin_panel():
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()
    if not user or user.role != 'admin':
        return redirect(url_for('index'))
    minerals = Mineral.query.all()
    shipments = Shipment.query.all()
    return render_template('admin_panel.html', minerals=minerals, shipments=shipments, email=email)

@app.route('/admin/toggle_stock/<int:mineral_id>')
def toggle_stock(mineral_id):
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()
    if not user or user.role != 'admin':
        return redirect(url_for('index'))
    mineral = Mineral.query.get_or_404(mineral_id)
    mineral.in_stock = not mineral.in_stock
    db.session.commit()
    return redirect(url_for('admin_panel', email=email))

@app.route('/admin/update_status/<int:shipment_id>', methods=['POST'])
def update_status(shipment_id):
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()
    if not user or user.role != 'admin':
        return redirect(url_for('index'))
    shipment = Shipment.query.get_or_404(shipment_id)
    new_status = request.form.get('status')
    shipment.status = new_status
    db.session.commit()
    return redirect(url_for('admin_panel', email=email))

if __name__ == '__main__':
    app.run(debug=True)
