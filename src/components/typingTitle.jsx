import React, { useState, useEffect } from "react";

const TypingTitle = () => {
  const fullText = "استمتع بالاسترخاء";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;

      if (index === fullText.length) {
        clearInterval(intervalId);
      }
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1 className="absolute -top-10 left-1/3 text-xs md:mt-20 md:text-lg text-white font-bold">
      {displayedText}
    </h1>
  );
};

export default TypingTitle;
