# Traderock Logistics Website

A modern web application for managing and booking mineral shipments from Nairobi or Mombasa to various destinations. Users can sign up, book shipments by weight or tonne, track order history, and enjoy a rich interactive experience.

---

## 🌐 Project Overview

**Traderock Logistics** is a Flask + React-based logistics web application focused on:
- Booking mineral shipments
- Viewing pricing from depots
- Tracking shipment history
- Secure login/signup flow
- A stylish, animated user interface

---

## 📁 Folder Structure

traderock-logistics-final/
├── backend/ # Flask backend (Python)
│ └── app.py # Main Flask app
├── frontend/ # React frontend (JavaScript)
│ └── src/
│ ├── Pages/
│ │ ├── BookShipment.js
│ │ ├── Login.js
│ │ ├── Signup.js
│ │ ├── Profile.js
│ │ ├── History.js
│ ├── components/
│ │ └── Navbar.js
│ ├── styles/
│ │ ├── login.css
│ └── App.js
├── README.md
└── requirements.txt



---

## 🔐 Authentication Features

### 1. **Signup**
- Route: `/api/signup`
- Frontend: `Signup.js`
- Input: name, email, password, confirm password
- Validation: password match, valid email, required fields
- Stores user in backend and saves info in `localStorage`

### 2. **Login**
- Route: `/api/login`
- Frontend: `Login.js` or `Profile.js`
- Input: email and password
- On success, user is stored in localStorage

### 3. **Logout**
- Button in `Profile.js`
- Clears localStorage and redirects to login

---

## 📦 Shipment Booking

### File: `BookShipment.js`

- Allows users to:
  - Choose mineral
  - Select depot (Nairobi or Mombasa)
  - Enter shipment weight (tonnes or kg)
  - View auto-calculated prices
  - Submit order and view confirmation

### Backend (Flask):
- Routes for:
  - `/api/minerals` (GET)
  - `/api/submit_booking` (POST)
  - `/api/destinations` (GET)

---

## 📜 Booking History

### File: `History.js`

- Shows all past shipments by the logged-in user
- Pulled from `/api/history`
- Displays mineral, depot, destination, price, and date

---

## 🎨 UI & UX Enhancements

- **Fixed Navbar** (`Navbar.js`)  
  - Fixed to top using Tailwind classes (`fixed top-0 w-full z-50`)
  - Responsive links for home, booking, history, login

- **Animated Login Page** (`login.css`)
  - Background gradient animation
  - Input zoom-on-focus
  - Animated entry for login container

- **Form Animations**  
  - All form fields animate on focus
  - Buttons scale slightly on hover

- **Success Pages**  
  - Toasts and success animations on booking and login

---

## ⚙️ Technologies Used

### Frontend:
- React.js
- Tailwind CSS
- React Router DOM
- React Toastify

### Backend:
- Python
- Flask
- Flask-CORS
- JSON APIs

---

## ✅ Setup Instructions

### Backend:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

