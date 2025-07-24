// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
//import { motion } from "framer-motion";
import './Background.css';


function Home() {
  return (
    <div className="dark-wrapper">
      <div className="dark-bg"></div>

      <div className="relative z-10 p-8 text-center">
        <header className="mb-10">
          <h1 className="text-5xl font-bold text-blue-300">Traderock Logistics</h1>
          <p className="mt-4 text-xl text-gray-300">
            Efficient. Reliable. Global Mineral Transport & Mining Solutions.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-blue-200">Our Mission</h2>
          <p className="max-w-3xl mx-auto text-gray-400">
            Traderock specializes in end-to-end mining logistics...
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-blue-200">Our Core Services</h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 justify-center">
            {[
              { name: "Exploration", image: "/images/Services/exploration.jpg" },
              { name: "Processing", image: "/images/Services/processing.jpg" },
              { name: "Transport", image: "/images/Services/transport.jpeg" },
              { name: "Export", image: "/images/Services/export.jpeg" },
            ].map((service) => (
              <Link to="/services" key={service.name}>
                <div className="bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition p-4">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-medium text-blue-100">{service.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-200">Why Choose Us</h2>
          <ul className="max-w-2xl mx-auto text-left text-gray-300 list-disc list-inside space-y-2">
            <li>✅ Industry-grade equipment and technology</li>
            <li>✅ Proven track record in global mineral logistics</li>
            <li>✅ Sustainable and safety-focused practices</li>
            <li>✅ Professional and experienced workforce</li>
          </ul>
        </section>
      </div>
      {/* Existing content */}

<footer className="bg-slate-900 text-gray-400 text-center py-4 mt-12 relative z-10">
  <p>© 2025 Traderock Logistics | All Rights Reserved</p>
</footer>

    </div>
  );
}

export default Home;
