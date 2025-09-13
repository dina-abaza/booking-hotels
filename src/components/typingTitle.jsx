import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const TypingTitle = () => {
  const { t } = useTranslation("home");
  const fullText = t("typing_title"); // 👈 النص من الترجمة

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(intervalId);
    }, 150);

    return () => clearInterval(intervalId);
  }, [fullText]);

  return (
    <h1
   className={`
    text-white font-bold text-center
    text-lg mt-24      /* 📱 موبايل: بداية */
    sm:text-xl sm:mt-24  /* 📱 تابلت: أكبر شوية */
    md:text-2xl md:mt-24  /* 💻 لابتوب */
    lg:text-3xl lg:mt-28   /* 🖥️ ديسكتوب */
    transition-all duration-500
  `}
    >
      {displayedText}
    </h1>
  );
};

export default TypingTitle;
