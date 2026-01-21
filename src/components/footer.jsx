import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    // الخلفية أبيض كريمي مريح للعين
    <footer className="bg-[#FCFAFA] text-[#1a1a1a] pt-16 pb-8 mt-20 border-t-4 border-[#D4AF37]" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div className="flex flex-col items-start text-right">
          <h2 className="text-[#D4AF37] text-3xl font-black italic tracking-tighter mb-4">
            travilio <span className="text-black font-light">HOTELS</span>
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed font-medium max-w-xs">
            بوابتك لعالم من الفخامة والرفاهية. نحن نهتم بأدق التفاصيل لضمان إقامة تليق بمستواك الرفيع.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-start text-right">
          <h4 className="text-black font-bold mb-6 border-b-2 border-[#D4AF37] pb-1 text-sm tracking-widest uppercase">
            روابط هامة
          </h4>
          <ul className="space-y-4 text-sm font-bold text-zinc-600">
            <li><Link to="/" className="hover:text-[#D4AF37] transition-all block">الرئيسية</Link></li>
            <li><Link to="/about" className="hover:text-[#D4AF37] transition-all block">من نحن</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4AF37] transition-all block">اتصل بنا</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-start text-right">
          <h4 className="text-black font-bold mb-6 border-b-2 border-[#D4AF37] pb-1 text-sm tracking-widest uppercase">
            تواصل مباشر
          </h4>
          <ul className="space-y-4 text-sm font-bold text-zinc-600">
            <li className="flex items-center gap-3">
               <FaEnvelope className="text-[#D4AF37] text-lg" />
               <span className="font-sans">info@travilio-hotels.com</span>
            </li>
            <li className="flex items-center gap-3">
               <FaPhoneAlt className="text-[#D4AF37] text-lg" />
               <span dir="ltr" className="font-sans">+20 123 456 789</span>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-start text-right">
          <h4 className="text-black font-bold mb-6 text-sm tracking-widest uppercase">
            تابعنا
          </h4>
          <div className="flex gap-4">
            {[
              { icon: <FaFacebookF />, id: 1 },
              { icon: <FaInstagram />, id: 2 },
              { icon: <FaTwitter />, id: 3 },
            ].map((social) => (
              <a
                key={social.id}
                href="#"
                className="w-11 h-11 flex items-center justify-center bg-white border-2 border-[#D4AF37]/20 rounded-full text-[#D4AF37] shadow-sm transition-all duration-300 hover:bg-[#D4AF37] hover:text-white hover:-translate-y-1"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-16 pt-8 border-t border-zinc-200 text-center">
        <p className="text-zinc-400 text-[10px] font-bold tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} travilio HOTELS. THE ART OF LIVING.
        </p>
      </div>
    </footer>
  );
};

export default Footer;