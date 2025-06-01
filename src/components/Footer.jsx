import React from "react";
import { FaInstagram, FaFacebookF, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* LEFT SIDE: COPYRIGHT */}
        <div className="text-sm text-center md:text-left">
          © 2025 MoneyDash. All rights reserved.
        </div>

        {/* CENTER: CREDITS */}
        <div className="text-sm text-center">
          Made with ❤️ by a   <a
            href="https://www.instagram.com/i_m_naveen__/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 underline"
          >
           Mern Dev
          </a> 
           {/* | Powered by{" "}
          <a
            href="https://gnews.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 underline"
          >
            GNews API
          </a> */}
        </div>

        {/* RIGHT SIDE: SOCIAL LINKS */}
        <div className="flex space-x-4 text-white text-lg">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/people/Top-New/100068401404644/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="mailto:support@moneydash.com"
            className="hover:text-emerald-400 transition"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
