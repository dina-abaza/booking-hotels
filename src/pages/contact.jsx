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
      const response = await axios.post(
        "https://booking-hotels-back-end-api.vercel.app/api/contact",
        formData,
        { withCredentials: true }
      );
      toast.success("✅ تم إرسال رسالتك بنجاح");
      console.log("Message sent successfully:", response.data.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error.response ? error.response.data.error : error.message);
      toast.error("❌ حدث خطأ أثناء الإرسال");
    }
  };

  return (
    <div
      className={`p-6 max-w-4xl mx-auto mt-16 transition-transform duration-700 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
      style={{ willChange: "transform, opacity" }}
      dir="rtl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-black">
        {/* أيقونة التليفون مع أنيميشن */}
        <FiPhone className="text-green-500 phone-ring" size={28} />
        تواصل معنا
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md w-[90%] md:w-[70%] lg:w-[60%] mx-auto"
      >
        <input
          type="text"
          name="name"
          placeholder="الاسم الكامل"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border-b border-r rounded-full border-green-600 px-2 py-2 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border-b border-r rounded-full border-green-600 px-2 py-2 focus:outline-none"
        />
        <input
          type="text"
          name="subject"
          placeholder="الموضوع"
          value={formData.subject}
          onChange={handleChange}
          className="w-full border-b border-r rounded-full border-green-600 px-2 py-2 focus:outline-none"
        />
        <textarea
          name="message"
          placeholder="اكتب رسالتك هنا..."
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full border-b border-r border-green-600 px-2 py-2 focus:outline-none h-32 resize-none"
        ></textarea>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            إرسال
          </button>
        </div>

        {status && (
          <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
        )}
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">معلومات التواصل المباشر</h3>
        <div className="bg-gray-100 p-4 rounded-md shadow-sm space-y-2">
          <p>
            <span className="font-bold">📧 البريد الإلكتروني:</span>{" "}
            bookify@example.com
          </p>
          <p>
            <span className="font-bold">📞 رقم الهاتف:</span> +20 123 456 789
          </p>
          <p>
            <span className="font-bold">📍 العنوان:</span> القاهرة، مصر
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">موقعنا على الخريطة</h3>
        <div className="w-full h-96 rounded overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.4191201011485!2d31.235711075440106!3d30.025385122333802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f997287f0d3%3A0x35f5a9349f918ea7!2z2KfZhNmF2LnZhdin2YYg2KfZhNi52YXYp9mF2Iwg2YXYs9in2YXYqSDYp9mE2YXYuQ!5e0!3m2!1sen!2seg!4v1716559698754!5m2!1sen!2seg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
