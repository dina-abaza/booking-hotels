import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-4 mt-10 mb-2">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

        
        <div>
          <h4 className="text-lg font-bold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
    
    
        <div>
          <h4 className="text-lg font-bold mb-3">Contact Us</h4>
          <p className="text-sm">Email: support@hotelbooking.com</p>
          <p className="text-sm">Phone: +20 123 456 789</p>
        </div>

        
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-bold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
            <a href="#" className="hover:text-green-400"><FaGlobe /></a>
          </div>
        </div>
      </div>


      <div className="text-center text-gray-400 text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Hotel Booking. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
