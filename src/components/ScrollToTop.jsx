import React, { useState, useEffect } from 'react';
import scrolltotopimg from '../assets/images/scroll.png';


const ScrollToTop = () => {

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <img src={scrolltotopimg} className='fixLogo scrollToTop' onClick={scrollToTop} alt="scroll-up" />
      )}
    </div>
  );
};

export default ScrollToTop;
