import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';



const Footer = () => {

  return (

    <footer className="footer">

      <section className="subFooter">
        <article className="footer-sectionTwo">
          <h1 className="headingBig">Buying</h1>
        </article>

        <article className="footer-sectionTwo">
          <h1 className='headingSmol'>Follow Us</h1>
          <div className="footerLogos">
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
              <YouTubeIcon />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </a>
            <a href="https://www.x.com/" target="_blank" rel="noopener noreferrer">
              <XIcon />
            </a>
          </div>
        </article>

        <article className="footer-section">
          <h1 className='headingSmol'>Quick Links</h1>
          <div className="footerContent">
            <a href="/" rel="noopener noreferrer" className="text">Home</a>
            <a href="/" rel="noopener noreferrer" className="text">Best Sellers</a>
            <a href="/" rel="noopener noreferrer" className="text">New Arrivals</a>
            <a href="/" rel="noopener noreferrer" className="text">All Categories</a>
          </div>
        </article>

        <article className="footer-section">
          <h1 className='headingSmol'>Policies</h1>
          <div className="footerContent">
            <a href="/" rel="noopener noreferrer" className="text">Privacy Policy</a>
            <a href="/" rel="noopener noreferrer" className="text">Return Policy</a>
            <a href="/" rel="noopener noreferrer" className="text">Payment Policy</a>
            <a href="/" rel="noopener noreferrer" className="text">Terms & Conditions</a>
          </div>
        </article>

        <article className="footer-section">
          <h1 className='headingSmol'>Company</h1>
          <div className="footerContent">
            <a href="/" rel="noopener noreferrer" className="text">FAQs</a>
            <a href="/" rel="noopener noreferrer" className="text">About Us</a>
            <a href="/" rel="noopener noreferrer" className="text">Contact Us</a>
            <a href="/" rel="noopener noreferrer" className="text">Help Center</a>
          </div>
        </article>
      </section>

      <section className='footer-sectionThree'>
        <div className="footerLogoCont">
          <h1 className="headingBig">Buying</h1>
        </div>
        <div className="footerLogoCont">
          <h1 className='headingSmol'>Follow Us</h1>
          <div className="footerLogos">
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
              <YouTubeIcon />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </a>
            <a href="https://www.x.com/" target="_blank" rel="noopener noreferrer">
              <XIcon />
            </a>
          </div>
        </div>
      </section>

      <div className="footer-bottom">
        <div className="footer-bottom-sec">
          <p className='textBig'>Icons by <a href="https://www.mui.com/" target="_blank" rel="noopener noreferrer" className='textBig'>Material Icons</a></p>
        </div>
        <div className="footer-bottom-sec">
          <p className='textBig'>&copy; 2025 Buying</p>
        </div>
        <div className="footer-bottom-sec">
          <p className='textBig'>Designed & Created by Imuv21</p>
        </div>
      </div>

    </footer>

  );
};

export default Footer;
