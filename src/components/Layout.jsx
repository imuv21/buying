import React, { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import whatsapp from '../assets/images/whatsapp.png';


const Layout = ({ children }) => {

    return (
        <Fragment>
            <Header />
            {children}
            <a id="whatsapp-link" target="_blank" aria-label="Send a message via WhatsApp" href="https://wa.me/+919026075867?text=Hii, I need help ">
                <img className='fixLogo whatsapp' src={whatsapp} alt="whatsapp" />
            </a>
            <ScrollToTop />
            <Footer />
        </Fragment>
    );
};

export default Layout;