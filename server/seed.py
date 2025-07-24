from app import db
from models import Mineral, Destination, User
from werkzeug.security import generate_password_hash

# Clear old data
Mineral.query.delete()
Destination.query.delete()
User.query.delete()

db.session.commit()

# Seed minerals
minerals = [
    "Limestone", "Flourite", "Bauxite", "Gypsum", "Barite", "Copper",
    "Iron Ore", "Coal", "Zinc", "Lead", "Manganese", "Cobalt", "Nickel",
    "Gold", "Silver", "Platinum", "Diamond", "Tantalum", "Tin", "Lithium"
]

for name in minerals:
    db.session.add(Mineral(name=name, in_stock=True))

# Seed destinations
locations = [
    ("Nairobi", 0), ("Mombasa", 500), ("Kisumu", 350), ("Eldoret", 310),
    ("Nakuru", 150), ("Athiriver", 30), ("Machakos", 63)
]

for name, distance in locations:
    db.session.add(Destination(name=name, distance_km=distance))

# Seed an admin user and a customer
admin = User(
    email="admin@traderock.com",
    password_hash=generate_password_hash("admin123"),
    role="admin"
)

customer = User(
    email="customer@traderock.com",
    password_hash=generate_password_hash("customer123"),
    role="customer"
)

db.session.add(admin)
db.session.add(customer)

db.session.commit()
print("✅ Seed data inserted successfully.")
