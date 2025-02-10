import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatDateTime } from '../../assets/Schemas';
import { getOrderDetails } from '../../slices/authSlice';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Loader from '../../components/Loader';
import DownloadIcon from '@mui/icons-material/Download';


const OrderDetails = () => {

    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { orderDetails, orderDetailsLoading, orderDetailsError } = useSelector((state) => state.auth);

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, orderId]);

    const download = () => {
        const input = document.querySelector('.page');

        const loadImages = () => {
            const images = input.querySelectorAll('img');
            const promises = Array.from(images).map((img) => {
                return new Promise((resolve) => {
                    if (img.complete) {
                        resolve();
                    } else {
                        img.onload = resolve;
                        img.onerror = resolve;
                    }
                });
            });
            return Promise.all(promises);
        };

        loadImages().then(() => {
            html2canvas(input, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4 size

                const imgWidth = 210;
                const pageHeight = 295;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save(`order-invoice-${orderId}.pdf`);
            });
        });
    };

    if (orderDetailsLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
            <Helmet>
                <title>Buying - Order Details</title>
                <meta name="description" content="Review the details of your order on Buying. See item information, payment summary, shipping status, and more to stay informed about your purchase." />
                <link rel="canonical" href="https://buying.netlify.app/order-details" />
            </Helmet>

            <section className='page flexcol center'>
                {orderDetailsError ? (<p className="text">Error loading order details!</p>) : orderDetails &&
                    <div className="order-detail-cont">
                        <div className="order-detail">
                            <div className="flex center-space w100">
                                <div className="flexcol start g5">
                                    <p className='headingSmol fw-600'>Order Details</p>
                                    <p className="textSmol">#{orderDetails?._id}</p>
                                </div>
                                <button style={{ width: '120px', textTransform: 'uppercase' }} onClick={download}><DownloadIcon /> Download</button>
                            </div>

                            <div className="order-product-cont">
                                <div className="order-detail-heading">
                                    <div className="orderProduct">
                                        <p className='text fw-800'>Product Details</p>
                                    </div>
                                    <div className="orderNum hideon600">
                                        <p className='text fw-800'>Item Price</p>
                                    </div>
                                    <div className="orderNum">
                                        <p className='text fw-800'>Quantity</p>
                                    </div>
                                    <div className="orderNum hideon400">
                                        <p className='text fw-800'>Total Amount</p>
                                    </div>
                                </div>

                                {orderDetails?.items && orderDetails.items?.length > 0 ? orderDetails.items.map((pro) => (
                                    <div className="order-product-content" key={pro._id}>
                                        <div className="orderProduct">
                                            <img src={pro.image} className="orderProductImg" alt={pro.title} />
                                            <div className="orderProductDetail">
                                                <p className='text fw-600'>{pro.title}</p>
                                            </div>
                                        </div>
                                        <div className="orderNum hideon600">
                                            <p className='textSmol'>{Number(pro.salePrice).toFixed(2)}₹</p>
                                        </div>
                                        <div className="orderNum">
                                            <p className='textSmol'>{pro.quantity}</p>
                                        </div>
                                        <div className="orderNum hideon400">
                                            <p className='textSmol fw-600'>{Number(pro.salePrice * pro.quantity).toFixed(2)}₹</p>
                                        </div>
                                    </div>
                                )) : (<p className='text'>No products found!</p>)
                                }
                            </div>

                            <div className="order-subtotal">
                                <div className="subtotalheading">
                                    <p className='text'>Order Status :</p>
                                    <p className='text'>Date & Time :</p>
                                    {/* <p className='text'>Sub Total :</p>
                                    <p className='text'>Shipping Charge :</p>
                                    <p className='text'>Estimated Tax :</p> */}
                                    <p className='text fw-800'>Total (INR) :</p>
                                </div>
                                <div className="subtotaldetail">
                                    <p className='text'>{orderDetails?.status}</p>
                                    <p className='text'>{formatDateTime(orderDetails?.orderDate)}</p>
                                    <p className='text fw-800'>Rs. {Number(orderDetails?.totalAmount).toFixed(2)}₹</p>
                                </div>
                            </div>
                        </div>

                        <div className="order-address">
                            <div className="flex center-space w100">
                                <p className='headingSmol fw-600'>Address</p>
                            </div>
                            <div className="flexcol start w100 g5">
                                <p className='textSmol'>Address : {orderDetails?.address?.address}</p>
                                <p className='textSmol'>Landmark : {orderDetails?.address?.landmark}</p>
                                <p className='textSmol'>City : {orderDetails?.address?.city}</p>
                                <p className='textSmol'>Pin Code : {orderDetails?.address?.pincode}</p>
                                <p className='textSmol'>Number : {orderDetails?.address?.number}</p>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </Fragment>
    );
};

export default OrderDetails;