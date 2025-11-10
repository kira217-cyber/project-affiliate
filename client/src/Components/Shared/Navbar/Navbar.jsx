// components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbar, setNavbar] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5004";

  useEffect(() => {
    axios.get(`${API_URL}/api/navbar`)
      .then(res => setNavbar(res.data))
      .catch(() => console.log("Navbar লোড হয়নি"));
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const offset = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  if (!navbar) return <div className="h-16 bg-black"></div>;

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-[1480px] mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={`${API_URL}${navbar.logo}`}
            alt="Logo"
            className="w-36 h-8 md:h-12 md:w-60 object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 font-semibold">
          {navbar.links.map((link, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(link.sectionId)}
              className="hover:text-[#99FF47] transition duration-200 cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            to={navbar.registerButton.link}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition hover:opacity-90"
            style={{
              backgroundColor: navbar.registerButton.bgColor,
              color: navbar.registerButton.textColor,
            }}
          >
            <FaUser /> {navbar.registerButton.text}
          </Link>
          <Link
            to={navbar.loginButton.link}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition hover:opacity-90"
            style={{
              backgroundColor: navbar.loginButton.bgColor,
              color: navbar.loginButton.textColor,
            }}
          >
            {navbar.loginButton.text}
            <span className="text-lg ml-1">{navbar.loginButton.arrow}</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="p-4 space-y-3">
            {navbar.links.map((link, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(link.sectionId)}
                className="block w-full text-left py-2 text-lg hover:text-[#99FF47] transition"
              >
                {link.name}
              </button>
            ))}

            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
              <Link
                to={navbar.registerButton.link}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold"
                style={{
                  backgroundColor: navbar.registerButton.bgColor,
                  color: navbar.registerButton.textColor,
                }}
              >
                <FaUser /> {navbar.registerButton.text}
              </Link>
              <Link
                to={navbar.loginButton.link}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold"
                style={{
                  backgroundColor: navbar.loginButton.bgColor,
                  color: navbar.loginButton.textColor,
                }}
              >
                {navbar.loginButton.text}
                <span className="text-lg ml-1">{navbar.loginButton.arrow}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;