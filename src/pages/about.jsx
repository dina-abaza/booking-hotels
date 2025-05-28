import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function About() {
  return (
    <div  dir="rtl" className=" mx-auto px-6 py-10 mt-20 max-w-4xl text-black">
      <header className="text-center mb-16">
        <p className="text-3xl font-extrabold leading-relaxed">
          نحن هنا لتقديم أفضل تجربة حجز للفنادق والرحلات الجوية
        </p>
      </header>

      <section className=" mb-14">
        <h2 className="flex items-center text-2xl font-bold mb-4">
          <FaCheckCircle className="text-green-600 mr-3" />
          مهمتنا
        </h2>
        <p className="text-lg leading-relaxed text-gray-800">
          نحن نسعى لتوفير أفضل تجربة للمسافرين من خلال تقديم معلومات دقيقة،
          وعروض مميزة، وتجربة حجز سلسة لكل من الفنادق والرحلات الجوية. هدفنا هو
          جعل السفر أسهل وأكثر راحة للجميع.
        </p>
      </section>

      <section className=" mb-14">
        <h2 className="flex items-center text-2xl font-bold mb-6">
          <FaCheckCircle className="text-green-600 mr-3" />
          قيمنا
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center text-black">
              <FaCheckCircle className="text-green-600 mr-2" />
              الشفافية
            </h3>
            <p className="text-gray-700 leading-relaxed">
              نؤمن بأهمية الشفافية في تقديم كل التفاصيل التي يحتاجها عملاؤنا من
              أجل اتخاذ قرارات سفر مدروسة.
            </p>
          </div>
          <div >
            <h3 className="text-xl font-bold mb-2 flex items-center text-black">
              <FaCheckCircle className="text-green-600 mr-2" />
              الابتكار
            </h3>
            <p className="text-gray-700 leading-relaxed">
              نحن نستمر في الابتكار لتحسين خدماتنا بشكل دائم ونعمل على تقديم أدوات
              حجز جديدة تلبي احتياجات العملاء.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center text-black">
              <FaCheckCircle className="text-green-600 mr-2" />
              الجودة
            </h3>
            <p className="text-gray-700 leading-relaxed">
              نقدم أفضل الخيارات في الفنادق والرحلات الجوية لضمان راحة وسعادة
              عملائنا خلال سفرهم.
            </p>
          </div>
        </div>
      </section>

      <section className=" mb-14">
        <h2 className="flex items-center text-2xl font-bold mb-6">
          <FaCheckCircle className="text-green-600 mr-3" />
          تعرف على فريقنا
        </h2>
        <div className=" space-y-8 sm:space-y-0 sm:flex sm:justify-between">
          <div className=" text-center max-w-xs mx-auto">
            <h3 className="text-xl font-bold text-black mb-1">أحمد محمود</h3>
            <p className="text-gray-700">مؤسس ومدير المشروع</p>
          </div>
          <div className=" text-center max-w-xs mx-auto">
            <h3 className="text-xl font-bold text-black mb-1">سارة أحمد</h3>
            <p className="text-gray-700">مديرة التسويق</p>
          </div>
          <div className=" text-center max-w-xs mx-auto">
            <h3 className="text-xl font-bold text-black mb-1">محمد علي</h3>
            <p className="text-gray-700">مطور ويب</p>
          </div>
        </div>
      </section>

      <p className="text-center text-gray-700">
        إذا كان لديك أي أسئلة أو استفسارات، يُرجى زيارة صفحة{" "}
        <a href="/contact" className="text-green-600 underline font-semibold">
          تواصل معنا
        </a>
        .
      </p>
    </div>
  );
}
