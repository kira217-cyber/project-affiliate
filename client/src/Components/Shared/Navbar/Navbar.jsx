import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "কেন আমাদের?", id: "why-us" },
    { name: "কিভাবে এটা কাজ করে", id: "how-it-works" },
    { name: "কমিশন পরিকাঠামো", id: "commission" },
    { name: "যোগাযোগ করুন", id: "contact" },
  ];

  // সঠিক ফাংশন – কোনো টাইপিং নেই (JS)
  const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const navbarHeight = 80; // আপনার Navbar এর উচ্চতা (px) – চেক করুন
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  setIsOpen(false);
};
  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-380 mx-auto flex items-center justify-between px-4 py-3">
        {/* ✅ Logo */}
        <Link to={"/"} className="flex items-center space-x-2">
           <img
            src="https://i.ibb.co.com/Q7Cms1cc/Footer-Logo.png"
            alt="Rajabaji Logo"
            className="w-48"
          />
        </Link>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-semibold">
          {navLinks.map((nav, i) => (
            <Link
              key={nav.id}
              onClick={() => scrollToSection(nav.id)}
              className="hover:text-[#99FF47] transition-colors"
            >
              {nav.name}
            </Link>
          ))}
        </div>

        {/* ✅ Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to={'/register'} className="flex items-center gap-2 bg-[#99FF47] text-black px-4 py-2 rounded-full font-semibold hover:opacity-90 transition">
            <FaUser /> সদস্য সাইন ইন
          </Link>
          <Link to={'/login'} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
            এখন আবেদন করুন!
            <span className="text-lg">›</span>
          </Link>
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ✅ Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="flex flex-col items-start p-4 space-y-3">
            {navLinks.map((nav, i) => (
              <a
                key={i}
                className="text-white hover:text-[#99FF47] text-lg"
              onClick={() => scrollToSection(nav.id)}
              >
                {nav.name}
              </a>
            ))}

            <div className="flex flex-col w-full space-y-3 pt-4 border-t border-gray-700">
              <Link to={'/register'} className="flex items-center justify-center gap-2 bg-[#99FF47] text-black px-4 py-2 rounded-full font-semibold hover:opacity-90 transition">
                <FaUser /> সদস্য সাইন ইন
              </Link>
              <Link to={'/login'} className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
                এখন আবেদন করুন!
                <span className="text-lg">›</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
