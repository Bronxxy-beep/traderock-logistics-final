import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">

        {/* Left Spacer (invisible) */}
        <div className="d-none d-lg-block col-lg-4" />

        {/* Centered Brand / Logo */}
        <Link className="navbar-brand mx-auto d-flex align-items-center" to="/">
          <img
            src="/images/logo/logo.png"
            alt="TradeRock"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          <span className="fw-bold">TradeRock Logistics</span>
        </Link>

        {/* Toggler on right */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerMenu"
          aria-controls="navbarTogglerMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapsible Menu aligned right */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerMenu">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className="nav-link">Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/BookShipment" className="nav-link">Book Shipment</NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink to="login" className="nav-link">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="Signup" className="nav-link">Signup</NavLink>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
