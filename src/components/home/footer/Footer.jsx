import { FaFacebook } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { FaTelegramPlane } from "react-icons/fa";
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Footer = () => {
  return (
    <div className="bg-gray-100 p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Column 1: Customer Care */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Customer Care</h3>
          <ul className="space-y-2">
            <li><Link to="/help-center" className="text-gray-600 hover:text-primary">Help Center</Link></li>
            <li><Link to="/shopping-guide" className="text-gray-600 hover:text-primary">Shopping Guide</Link></li>
            <li><Link to="/payment" className="text-gray-600 hover:text-primary">Payment</Link></li>
            <li><Link to="/complaints" className="text-gray-600 hover:text-primary">Complaints</Link></li>
            <li><Link to="/contact-us" className="text-gray-600 hover:text-primary">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 2: About HPL */}
        <div>
          <h3 className="font-semibold text-lg mb-4">About HPL</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-gray-600 hover:text-primary">Introduction</Link></li>
            <li><Link to="/terms" className="text-gray-600 hover:text-primary">Terms and Conditions</Link></li>
            <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/seller-channel" className="text-gray-600 hover:text-primary">Seller Channel</Link></li>
            <li><Link to="/shipping-channel" className="text-gray-600 hover:text-primary">Shipping Channel</Link></li>
            <li><Link to="/flash-sale" className="text-gray-600 hover:text-primary">Flash Sale</Link></li>
          </ul>
        </div>

        {/* Column 3: Payment */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Payment</h3>
          <ul className="space-y-2">
            <li><Link to="/payment-information" className="text-gray-600 hover:text-primary">Payment Information</Link></li>
            <li><Link to="/payment-guide" className="text-gray-600 hover:text-primary">Payment Guide</Link></li>
            <li><Link to="/faqs" className="text-gray-600 hover:text-primary">FAQs</Link></li>
          </ul>
        </div>

        {/* Column 4: Media */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Media</h3>
          <ul className="space-y-2">
            <li className="flex items-center hover:text-primary">
              <FaFacebook className="mr-2" />
              <Link to="/facebook" className="text-gray-600 hover:text-primary">Facebook</Link>
            </li>
            <li className="flex items-center hover:text-primary">
              <CiInstagram className="mr-2" />
              <Link to="/instagram" className="text-gray-600 hover:text-primary">Instagram</Link>
            </li>
            <li className="flex items-center hover:text-primary">
              <FaTelegramPlane className="mr-2" />
              <Link to="/telegram" className="text-gray-600 hover:text-primary">Telegram</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Information */}
      <div className="text-center mt-6 text-gray-500">
        <p>© 2024 HPL. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
