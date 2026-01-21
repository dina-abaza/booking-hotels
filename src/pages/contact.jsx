import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPhone } from "react-icons/fi";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("جاري الإرسال...");

    try {
      await axios.post(
        "https://booking-hotels-back-end-api.vercel.app/api/contact",
        formData,
        { withCredentials: true }
      );
      toast.success("✅ تم إرسال رسالتك بنجاح");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setStatus("");
    } catch (error) {
      toast.error("❌ حدث خطأ أثناء الإرسال");
      setStatus("");
    }
  };

  return (
    <div
      className={`p-6 max-w-5xl mx-auto mt-26 transition-transform duration-700 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
      style={{ willChange: "transform, opacity" }}
      dir="rtl"
    >
      {/* العنوان الرئيسي - محاذى لليمين */}
      <h2 className="text-3xl font-bold mb-10 flex items-center justify-start gap-3 text-[#f5d37b]">
        <FiPhone className="text-[#b89338] animate-pulse" size={28} />
        تواصل معنا
      </h2>

      {/* الحاوية الرئيسية - تقسيم 50/50 */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* فورم التواصل */}
        <div className="w-full lg:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-black/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-[#3a2a16] h-full"
          >
            <input
              type="text"
              name="name"
              placeholder="الاسم الكامل"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-full border border-[#c9a24d] bg-black/60 text-[#f5d37b] focus:outline-none focus:ring-2 focus:ring-[#c9a24d] transition"
            />
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-full border border-[#c9a24d] bg-black/60 text-[#f5d37b] focus:outline-none focus:ring-2 focus:ring-[#c9a24d] transition"
            />
            <input
              type="text"
              name="subject"
              placeholder="الموضوع"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full border border-[#c9a24d] bg-black/60 text-[#f5d37b] focus:outline-none focus:ring-2 focus:ring-[#c9a24d] transition"
            />
            <textarea
              name="message"
              placeholder="اكتب رسالتك هنا..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#c9a24d] bg-black/60 text-[#f5d37b] focus:outline-none focus:ring-2 focus:ring-[#c9a24d] h-32 resize-none transition"
            ></textarea>

            <div className="flex justify-start">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#c9a24d] to-[#f5d37b] text-black font-bold px-10 py-3 rounded-full hover:scale-105 transition-all"
              >
                إرسال الرسالة
              </button>
            </div>
            {status && <p className="text-sm text-[#d6c3a3] mt-2">{status}</p>}
          </form>
        </div>

        {/* معلومات التواصل المباشر */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-[#3a2a16] h-full flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6 text-[#b89338] border-b border-[#f5d37b] pb-2">
              بيانات الاتصال المباشر
            </h3>
            <div className="space-y-6 text-lg">
              <div className="flex items-center gap-4">
                <span className="bg-[#c9a24d]/10 p-3 rounded-full text-[#c9a24d]">📧</span>
                <div>
                  <p className="font-bold text-[#c9a24d]">البريد الإلكتروني</p>
                  <p className="text-gray-700">bookify@example.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="bg-[#c9a24d]/10 p-3 rounded-full text-[#c9a24d]">📞</span>
                <div>
                  <p className="font-bold text-[#c9a24d]">رقم الهاتف</p>
                  <p className="text-gray-700" dir="ltr">+20 123 456 789</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="bg-[#c9a24d]/10 p-3 rounded-full text-[#c9a24d]">📍</span>
                <div>
                  <p className="font-bold text-[#c9a24d]">العنوان الرسمي</p>
                  <p className="text-gray-700">القاهرة، جمهورية مصر العربية</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* الخريطة */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4 text-[#b89338] text-right">موقعنا على الخريطة</h3>
        <div className="w-full h-80 rounded-3xl overflow-hidden shadow-2xl border border-[#3a2a16]">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123456789!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzQwLjAiTiAzMcKwMTQnMDguNSJF!5e0!3m2!1sar!2seg!4v1625000000000!5m2!1sar!2seg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;