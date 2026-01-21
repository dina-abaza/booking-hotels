import React, { useEffect, useState } from "react";
import AOS from "aos";
import {
  FaUsers,
  FaBullseye,
  FaGem,
  FaEye,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import "aos/dist/aos.css";

export default function About() {
  const fullText = "نحن هنا لتقديم أفضل تجربة حجز للفنادق";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1200, once: true, easing: "ease-out-cubic" });

    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      dir="rtl"
      className="
        mx-auto max-w-6xl px-6 py-16 mt-28
        text-[#f5e6c8]
      "
    >
      {/* العنوان */}
      <header
        data-aos="fade-up"
        className="text-center "
      >
        <p className="text-4xl font-extrabold leading-relaxed bg-gradient-to-r from-[#a57c2f] via-[#c9a24d] to-[#e6c173] bg-clip-text text-transparent">
          {displayText}
        </p>
        <p className="text-black mt-4 text-lg max-w-2xl mx-auto">
          من خلال منصتنا، أصبح بإمكانك استكشاف أفضل العروض، مقارنة الأسعار،
          واختيار الوجهة المثالية بسهولة تامة وفي دقائق معدودة.
        </p>
      </header>

      {/* فريقنا */}
      <section
        data-aos="fade-up"
        className="mb-16 bg-black/80 backdrop-blur rounded-3xl p-10 shadow-2xl border border-[#3a2a16]"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <h2 className="flex items-center text-3xl font-bold text-[#f5d37b]">
            <FaUsers className="ml-3 text-[#c9a24d]" />
            تعرف على فريقنا
          </h2>
          <p className="text-[#cbb893] text-sm max-w-md">
            فريق صغير متحمّس يركّز على بناء تجربة سفر بسيطة وممتازة
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            {
              img: "/person3.jpg",
              name: "أحمد محمود",
              role: "مؤسس ومدير المشروع",
              desc:
                "يقود الاستراتيجية العامة ويشرف على التعاون مع الشركاء التجاريين لضمان أفضل الصفقات.",
            },
            {
              img: "/person2.jpg",
              name: "سارة أحمد",
              role: "مديرة التسويق",
              desc:
                "مسؤولة عن حملات النمو والتواصل مع العملاء وتطوير محتوى يعزّز ثقة العلامة.",
            },
            {
              img: "/person.jpg",
              name: "محمد علي",
              role: "مطور ويب",
              desc:
                "يبني واجهات المستخدم ويضمن أداء عالي وتجربة استخدام سلسة.",
            },
          ].map((member, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              className="
                bg-gradient-to-b from-[#1a1a1a] to-black
                rounded-2xl p-8 text-center
                shadow-xl
                hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(201,162,77,0.25)]
                transition-all duration-500
                border border-[#3a2a16]
              "
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full mb-5 object-cover border-4 border-[#c9a24d]"
              />
              <h3 className="text-xl font-semibold text-[#f5d37b]">
                {member.name}
              </h3>
              <p className="text-sm text-[#cbb893] mt-1">
                {member.role}
              </p>
              <p className="text-[#d6c3a3] mt-4 text-sm leading-relaxed">
                {member.desc}
              </p>
              <div className="flex justify-center gap-5 mt-5 text-[#c9a24d] text-lg">
                <FaTwitter className="hover:text-[#f5d37b] transition" />
                <FaLinkedin className="hover:text-[#f5d37b] transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* مهمتنا */}
      <section
        data-aos="fade-right"
        className="mb-16 bg-black/70 rounded-3xl p-10 shadow-xl border border-[#3a2a16]"
      >
        <h2 className="flex items-center text-3xl font-bold mb-6 text-[#f5d37b]">
          <FaBullseye className="ml-3 text-[#c9a24d]" />
          مهمتنا
        </h2>
        <p className="text-lg leading-relaxed text-[#e7d6b4]">
          نعمل على تبسيط تجربة السفر من البداية للنهاية، مع توفير بيانات موثوقة
          وأدوات مقارنة ذكية وخيارات حجز شفافة.
        </p>
        <p className="text-[#cbb893] mt-5 leading-relaxed">
          نؤمن بأن كل رحلة تبدأ بخطة سليمة — لذلك نصمم واجهات تسرّع القرار وتقلّل
          وقت البحث.
        </p>
      </section>

      {/* قيمنا */}
      <section
        data-aos="fade-left"
        className="mb-16 bg-black/80 rounded-3xl p-10 shadow-xl border border-[#3a2a16]"
      >
        <h2 className="flex items-center text-3xl font-bold mb-10 text-[#f5d37b]">
          <FaGem className="ml-3 text-[#c9a24d]" />
          قيمنا
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            "الشفافية",
            "الابتكار",
            "الجودة",
            "الدعم",
            "المسؤولية",
            "الأمان",
          ].map((value, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              className="
                bg-[#141414]
                rounded-2xl p-6
                border border-[#3a2a16]
                hover:border-[#c9a24d]
                transition-all
              "
            >
              <h3 className="text-lg font-semibold mb-2 text-[#f5d37b]">
                {value}
              </h3>
              <p className="text-[#cbb893] text-sm">
                نلتزم بتقديم تجربة موثوقة تعكس أعلى معايير الجودة والاهتمام.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* رؤيتنا */}
      <section
        data-aos="fade-up"
        className="bg-black/70 rounded-3xl p-10 shadow-xl border border-[#3a2a16]"
      >
        <h2 className="flex items-center text-3xl font-bold mb-6 text-[#f5d37b]">
          <FaEye className="ml-3 text-[#c9a24d]" />
          رؤيتنا
        </h2>
        <p className="text-lg leading-relaxed text-[#e7d6b4]">
          أن نكون المنصة المفضلة للمسافرين في العالم العربي عبر الجمع بين
          التكنولوجيا وخدمة عملاء استثنائية.
        </p>
      </section>
    </div>
  );
}
