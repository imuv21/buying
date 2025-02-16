import React from 'react';

const TextSlider = () => {

  const content = [
    { text: "retro", className: "bold" },
    { text: "nintendo", className: "med" },
    { text: "deadpool", className: "lit" },
    { text: "anti-hero", className: "bold" },
    { text: "naruto", className: "med" },
    { text: "shonen", className: "lit" },
    { text: "breakingbad", className: "bold" },
    { text: "walterwhite", className: "med" },
    { text: "anime", className: "lit" },
    { text: "marvel", className: "bold" },
    { text: "starwars", className: "med" },
  ];

  return (
    <div className="marquee-cont">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="marquee-slider">
          {content.map((item, index) => (
            <p key={index} className={item.className} style={{ fontFamily: 'var(--headingFamily)' }}>
              {item.text}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TextSlider;
