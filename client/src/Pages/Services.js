import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTruck, FaIndustry, FaBoxOpen, FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./Background.css";

function Services() {
  const [services, setServices] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    setServices([
      {
        icon: <FaSearch className="text-blue-400" />,
        title: "Mineral Exploration",
        image: "/images/Services/exploration.jpg",
        description: "We identify valuable mineral deposits...",
        process: "Our exploration process includes remote sensing..."
      },
      {
        icon: <FaTruck className="text-blue-400" />,
        title: "Transportation & Logistics",
        image: "/images/Services/transport.jpeg",
        description: "Secure, reliable logistics from mine to port.",
        process: "Traderock provides comprehensive logistics..."
      },
      {
        icon: <FaIndustry className="text-blue-400" />,
        title: "Mineral Processing",
        image: "/images/Services/processing.jpg",
        description: "Processing raw minerals into market-grade products.",
        process: "After extraction, minerals are processed using..."
      },
      {
        icon: <FaBoxOpen className="text-blue-400" />,
        title: "Export & Supply Chain",
        image: "/images/Services/export.jpeg",
        description: "Handling exports and supply chain visibility.",
        process: "We manage everything from container loading..."
      },
    ]);
  }, []);

  const toggleExpand = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="dark-wrapper">
      <div className="dark-bg"></div>

      <div className="relative z-10 p-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-300 mb-8 text-center" data-aos="fade-down">
          Our Mining Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-800 shadow-md rounded overflow-hidden border border-slate-700 hover:shadow-xl transition duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-700 p-3 rounded-full">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  </div>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-gray-300" />
                  ) : (
                    <FaChevronDown className="text-gray-300" />
                  )}
                </div>
                <p className="text-gray-300 mt-2">{service.description}</p>

                {activeIndex === index && (
                  <div className="mt-4 p-4 bg-slate-700 rounded text-sm text-gray-100 transition-all duration-300">
                    <h4 className="font-semibold mb-2">Process Details:</h4>
                    <p>{service.process}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Existing content */}

<footer className="bg-slate-900 text-gray-400 text-center py-4 mt-12 relative z-10">
  <p>© 2025 Traderock Logistics | All Rights Reserved</p>
</footer>

    </div>
  );
}

export default Services;
