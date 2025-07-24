import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './About.css'
import {
  FaCheckCircle,
  FaGem,
  FaGlobeAfrica,
  FaHandshake,
  
  FaShieldAlt,
  FaCogs,
} from "react-icons/fa";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const team = [
    {
      name: "Benson Kilonzo Muema",
      role: "Chief Executive Officer",
      image: "/images/team/B.K.M.jpeg",
    },
    {
      name: "Simon Maina Kariuki",
      role: "Head of Operations",
      image: "/images/team/S.M.K.jpeg",
    },
    {
      name: "Dr. Samuel Kofi",
      role: "Chief Geologist",
      image: "/images/team/geologist.jpeg",
    },
    {
      name: "Kaburu B. Sanghani",
      role: "Global Logistics Director",
      image: "/images/team/K.B.S.jpeg",
    },
  ];

  const milestones = [
    {
      year: "2010",
      event: "Traderock Logistics founded in Accra, Ghana.",
    },
    {
      year: "2013",
      event: "Acquired first exploration license in Ashanti Region.",
    },
    {
      year: "2016",
      event: "Expanded into mineral processing in DRC.",
    },
    {
      year: "2018",
      event: "Opened new logistics hub in South Africa.",
    },
    {
      year: "2022",
      event: "Surpassed 1 million metric tons transported globally.",
    },
  ];

  return (
    <div className="about-wrapper">
        <div className="about-bg"></div>
  
    <div className="relative z-10 ">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1
          className="text-4xl font-bold text-blue-300 mb-6 text-center"
          data-aos="fade-down"
        >
          About Traderock Logistics
        </h1>

        {/* Company Overview */}
        <section className="mb-12" >
          <h2 className="text-2xl font-semibold text-blue-200 mb-4">
            Company Overview
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Traderock Logistics is a trusted global mining logistics company based in Africa, specializing in
            exploration, extraction, processing, and mineral transport. Our expertise spans over 30 countries with a strong network across mining hubs, ports, and trade routes. 
            We're redefining mining efficiency through advanced technologies, data-driven logistics, and a commitment to sustainable practices.
          </p>
        </section>

        {/* Licenses */}
        <section className="mb-16" data-aos="fade-up">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Licensed & Compliant
          </h2>
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
            <li>
              <strong>EXL-GH/218:</strong> Exploration License (Ghana) – Bauxite, Lithium.
            </li>
            <li>
              <strong>PROC-DR/1011:</strong> Mineral Processing License (DRC) – Copper, Cobalt.
            </li>
            <li>
              <strong>EXP-TZ/4120:</strong> Export License (Tanzania) – Cross-border trade approval.
            </li>
            <li>
              <strong>LOG-ZA/333:</strong> South Africa logistics certification for hazardous cargo.
            </li>
            <li>
              <strong>ISO Certified:</strong> ISO 9001 & ISO 14001 certified.
            </li>
          </ul>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16" data-aos="fade-up">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Why Choose Traderock?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <FaCheckCircle className="text-green-600 text-2xl mt-1" />
              <p className="text-lg">
                <strong>Reliable & Transparent Operations</strong> – With real-time tracking and full reporting.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <FaGem className="text-purple-500 text-2xl mt-1" />
              <p className="text-lg">
                <strong>Expert Mineral Handling</strong> – Certified geologists and chemical engineers on-site.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <FaGlobeAfrica className="text-blue-600 text-2xl mt-1" />
              <p className="text-lg">
                <strong>Africa-Wide Infrastructure</strong> – Hubs in Ghana, DRC, Zambia, South Africa.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <FaHandshake className="text-yellow-600 text-2xl mt-1" />
              <p className="text-lg">
                <strong>Global Trade Partners</strong> – Trusted by Fortune 500 companies & governments.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16" data-aos="fade-up">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Company Timeline
          </h2>
          <ul className="border-l-4 border-blue-300 pl-6 space-y-4 text-gray-700 text-lg">
            {milestones.map((item, idx) => (
              <li key={idx} className="relative">
                <span className="absolute -left-3 top-1.5 w-3 h-3 bg-blue-500 rounded-full" />
                <strong>{item.year}:</strong> {item.event}
              </li>
            ))}
          </ul>
        </section>

        {/* Team */}
        <section className="mb-20" data-aos="fade-up">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Leadership Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((person, index) => (
              <div
                key={index}
                className="bg-Blue p-4 rounded-lg shadow-md text-center"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="font-semibold text-lg text-blue-900">{person.name}</h3>
                <p className="text-blue-600">{person.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-blue p-6 md:p-10 rounded-xl shadow" data-aos="fade-up">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Our Core Values
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
            <li>
              <FaShieldAlt className="inline text-blue-600 mr-2" />
              Safety & Responsibility
            </li>
            <li>
              <FaCogs className="inline text-gray-600 mr-2" />
              Innovation & Efficiency
            </li>
            <li>
              <FaHandshake className="inline text-yellow-600 mr-2" />
              Partnerships & Trust
            </li>
            <li>
              <FaGlobeAfrica className="inline text-green-600 mr-2" />
              Sustainability & Ethics
            </li>
          </ul>
        </section>
      </div>
    </div>
    {/* Existing content */}

<footer className="bg-slate-900 text-gray-400 text-center py-4 mt-12 relative z-10">
  <p>© 2025 Traderock Logistics | All Rights Reserved</p>
</footer>

    </div>
  );
}

export default About;
