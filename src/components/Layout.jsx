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
            <a id="whatsapp-link" target="_blank" aria-label="Chat with us on WhatsApp" href="https://wa.me/+919026075867?text=Hi, I’d like to customize some merch!">
                <img className='fixLogo whatsapp' src={whatsapp} alt="Chat with us on WhatsApp" />
            </a>
            <ScrollToTop />
            <Footer />
        </Fragment>
    );
};

export default Layout;