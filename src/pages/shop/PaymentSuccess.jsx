import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {

    const navigate = useNavigate();
    const [paymentParams] = useSearchParams();
    const reference = paymentParams.get('reference');

    const shopping = () => {
        navigate('/category');
    }

    return (
        <Fragment>
            <Helmet>
                <title>Buying - Payment Success</title>
                <meta name="description" content="Review and manage your cart items with ease on Buying. Adjust quantities, remove items, and prepare for a secure checkout for a seamless shopping experience." />
                <link rel="canonical" href="https://buying.netlify.app/payment-success" />
            </Helmet>
            <section className="page flexcol center" style={{ height: '70vh' }}>
                <div className="authBox">
                    <h1 className="heading" style={{ textTransform: 'capitalize' }}>Payment Successful!</h1>
                    {reference && <p className='textBig'>Your payment reference is: <span className='textBig fw-600'>{reference}</span></p>}
                    <p className='text'>Thank you for your purchase!</p>
                    <button onClick={() => shopping()}>Continue Shopping</button>
                </div>
            </section>
        </Fragment>
    )
}

export default PaymentSuccess