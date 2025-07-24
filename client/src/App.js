import './App.css';
import Home from './Pages/Home';
import Navbar from './Components/Navbar'; 

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from 'react';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Services from './Pages/Services';
import BookShipment from './Pages/BookShipment';
import LoginRegister from './Pages/LoginRegister';
import RegisterForm from './Pages/RegisterForm';
import ShipmentHistory from './Pages/ShipmentHistory';
import Login from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element= {<Home />}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/BookShipment' element={<BookShipment/>}/>
        <Route path='client/src/Pages/LoginRegister.js' element={<LoginRegister/>}/>
        <Route path='/Signup' element={<RegisterForm/>}/>
        <Route path='/shipment-history' element={<ShipmentHistory/>}/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>

    </Router>
    
  );
}

export default App;

// JSX - syntax extension that combines js and HTML

