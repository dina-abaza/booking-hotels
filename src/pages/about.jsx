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
    AOS.init({ duration: 1000, once: true });

    // تأثير الكتابة
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100); // 100ms لكل حرف

    return () => clearInterval(interval);
  }, []);

  return (
    <div dir="rtl" className="mx-auto px-6 py-12 mt-20 max-w-6xl">
      {/* العنوان الرئيسي */}
      <header data-aos="fade-up" className="text-center mb-12">
        <p className="text-3xl font-extrabold leading-relaxed text-gray-800">
          {displayText}
        </p>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          من خلال منصتنا، أصبح بإمكانك استكشاف أفضل العروض، مقارنة الأسعار،
          واختيار الوجهة المثالية بسهولة تامة وفي دقائق معدودة.
        </p>
      </header>

      {/* فريقنا */}
      <section
        data-aos="fade-left"
        className="mb-12 bg-white shadow-sm rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center text-2xl font-bold text-gray-800">
            <FaUsers className="text-blue-600 ml-3" />
            تعرف على فريقنا
          </h2>
          <p className="text-gray-500 text-sm">
            فريق صغير متحمّس يركّز على بناء تجربة سفر بسيطة وممتازة
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* عضو 1 */}
          <div
            data-aos="zoom-in"
            className="bg-gray-50 rounded-xl p-6 text-center shadow hover:scale-105 transition"
          >
            <img
              src="/person3.jpg"
              alt="أحمد محمود"
              className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800">أحمد محمود</h3>
            <p className="text-sm text-gray-600 mt-1">مؤسس ومدير المشروع</p>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              يقود الاستراتيجية العامة ويشرف على التعاون مع الشركاء التجاريين
              لضمان أفضل الصفقات للمستخدمين.
            </p>
            <div className="flex justify-center gap-4 mt-4 text-blue-600">
              <a href="#" aria-label="Twitter أحمد">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn أحمد">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* عضو 2 */}
          <div
            data-aos="zoom-in"
            className="bg-gray-50 rounded-xl p-6 text-center shadow hover:scale-105 transition"
          >
            <img
              src="/person2.jpg"
              alt="سارة أحمد"
              className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800">سارة أحمد</h3>
            <p className="text-sm text-gray-600 mt-1">مديرة التسويق</p>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              مسؤولة عن حملات النمو والتواصل مع العملاء، وتطوير محتوى يجذب
              المسافرين ويعزّز ثقة العلامة.
            </p>
            <div className="flex justify-center gap-4 mt-4 text-blue-600">
              <a href="#" aria-label="Twitter سارة">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn سارة">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* عضو 3 */}
          <div
            data-aos="zoom-in"
            className="bg-gray-50 rounded-xl p-6 text-center shadow hover:scale-105 transition"
          >
            <img
              src="/person.jpg"
              alt="محمد علي"
              className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800">محمد علي</h3>
            <p className="text-sm text-gray-600 mt-1">مطور ويب</p>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              يبني واجهات المستخدم، يضمن أداء عالي وتجربة استخدام سلسة على جميع
              الأجهزة والمتصفحات.
            </p>
            <div className="flex justify-center gap-4 mt-4 text-blue-600">
              <a href="#" aria-label="Twitter محمد">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn محمد">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* مهمتنا */}
      <section
        data-aos="fade-right"
        className="mb-12 bg-white shadow-sm rounded-2xl p-6"
      >
        <h2 className="flex items-center text-2xl font-bold mb-4 text-gray-800">
          <FaBullseye className="text-blue-600 ml-3" />
          مهمتنا
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          نعمل على تبسيط تجربة السفر من البداية للنهاية. نركز على توفير بيانات
          موثوقة، أدوات مقارنة ذكية، وخيارات حجز شفافة تضع احتياجات المسافر أولاً.
        </p>
        <p className="text-gray-600 mt-4 leading-relaxed">
          نؤمن بأن كل رحلة تبدأ بخطة سليمة — لذلك نصمم واجهات وخدمات تسرّع اتخاذ
          القرار وتقلّل من وقت البحث، مع دعم مباشر عند الحاجة.
        </p>
      </section>

      {/* قيمنا */}
      <section
        data-aos="fade-left"
        className="mb-12 bg-gray-50 shadow-sm rounded-2xl p-6"
      >
        <h2 className="flex items-center text-2xl font-bold mb-6 text-gray-800">
          <FaGem className="text-blue-600 ml-3" />
          قيمنا
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">الشفافية</h3>
            <p className="text-gray-600 text-sm">
              نعرض الأسعار والشروط بوضوح دون رسوم مخفية، ونقدّم معلومات دقيقة
              لقرارات سفر مطمئنة.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">الابتكار</h3>
            <p className="text-gray-600 text-sm">
              نطوّر خصائص تسهّل البحث والحجز ونستفيد من التحليلات لرفع جودة
              التوصيات الشخصية.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">الجودة</h3>
            <p className="text-gray-600 text-sm">
              نختار شركاء موثوقين ونراجع تجارب المستخدمين لضمان معيار ثابت للخدمات.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">الدعم</h3>
            <p className="text-gray-600 text-sm">
              دعم سريع وعملي موجود لحل المشاكل وتقديم إرشاد قبل وأثناء وبعد الحجز.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              المسؤولية
            </h3>
            <p className="text-gray-600 text-sm">
              نسعى لعمليات سفر أكثر استدامة ونشجع الممارسات التي تحترم المجتمع
              والبيئة.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">الأمان</h3>
            <p className="text-gray-600 text-sm">
              حماية بيانات المستخدمين واتباع معايير الدفع الآمن من أولوياتنا.
            </p>
          </div>
        </div>
      </section>

      {/* رؤيتنا */}
      <section
        data-aos="fade-right"
        className="mb-12 bg-white shadow-sm rounded-2xl p-6"
      >
        <h2 className="flex items-center text-2xl font-bold mb-4 text-gray-800">
          <FaEye className="text-blue-600 ml-3" />
          رؤيتنا
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          أن نكون المنصة المفضلة للمسافرين في العالم العربي عبر الجمع بين
          التكنولوجيا وخدمة عملاء استثنائية — لتسهيل رحلات أكثر ذكاءً وأمانًا.
        </p>
      </section>
    </div>
  );
}
