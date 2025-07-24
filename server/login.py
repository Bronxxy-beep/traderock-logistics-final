# login.py — Create admin user
from models import db, User
from app import app
from werkzeug.security import generate_password_hash

with app.app_context():
    email = 'admin@traderock.com'
    if not User.query.filter_by(email=email).first():
        admin = User(full_name='Admin', email=email, role='admin', password_hash=generate_password_hash('admin123'))
        db.session.add(admin)
        db.session.commit()
        print("Admin user created.")
    else:
        print("Admin user already exists.")