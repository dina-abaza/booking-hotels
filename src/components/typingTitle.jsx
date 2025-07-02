
import React, { useState, useEffect } from "react";

const TypingTitle = () => {
  const fullText = "استمتع بالاسترخاء";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(intervalId);
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1
      className={`
        text-white font-bold text-center
        text-lg mt-32
        sm:text-xl sm:mt-20
        md:text-2xl md:mt-24
        transition-all duration-500
      `}
    >
      {displayedText}
    </h1>
  );
};

export default TypingTitle;
