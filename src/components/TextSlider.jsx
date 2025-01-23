import React from 'react';

const TextSlider = () => {

  const content = [
    { text: "Gardening", className: "bold" },
    { text: "Wood", className: "med" },
    { text: "Acrylic", className: "lit" },
    { text: "Neon", className: "bold" },
    { text: "Toys", className: "med" },
    { text: "Stationary", className: "lit" },
    { text: "Customize", className: "bold" },
    { text: "Artificial Plants", className: "med" },
    { text: "Wood Easel Canvas", className: "lit" },
    { text: "Festival Neon", className: "bold" },
    { text: "Plants Accessories", className: "med" },
    { text: "Wood Shelves", className: "lit" },
  ];

  return (
    <div className="marquee-cont">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="marquee-slider">
          {content.map((item, index) => (
            <p key={index} className={item.className} style={{fontFamily: 'var(--headingFamily)'}}>
              {item.text}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TextSlider;
