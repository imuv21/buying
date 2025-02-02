import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getInvoice } from '../../slices/orderSlice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Loader from '../../components/Loader/Loader';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const AdminOrderDetail = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { invoice, invoiceLoading, invoiceError } = useSelector((state) => state.order);

    useEffect(() => {
        if (orderId) {
            dispatch(getInvoice(orderId));
        }
    }, [dispatch, orderId]);

    const formattedDate = (dateAndTimeString) => {
        const dateObject = new Date(dateAndTimeString);
        const dateString = dateObject.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
        return `${dateString}`;
    }

    const formattedTime = (dateAndTimeString) => {
        const dateObject = new Date(dateAndTimeString);
        const timeString = dateObject.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true
        });
        return `${timeString}`;
    }

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

    const back = () => {
        navigate('/dashboard/orders-list');
    }


    return (
        <Fragment>

            {invoiceLoading ? (
                <Loader />
            ) : invoiceError ? (
                <p className="text">Error loading order details!</p>
            ) : <div className="order-detail-cont">
                <div className="order-detail">
                    <div className="flex center-space wh">
                        <div className="flexcol start g5">
                            <div className="backSection">
                                <ArrowBackIosNewIcon onClick={back} /> <p className='headingSmol'>Order Details</p>
                            </div>
                            <p className="textSmol">#{invoice?.orderDetails?.orderId}</p>
                        </div>
                        <button style={{ width: '120px', textTransform: 'uppercase' }} className='payBtn' onClick={download}><DownloadIcon /> Download</button>
                    </div>
                    <div className="order-product-cont">
                        <div className="order-detail-heading">
                            <div className="orderProduct">
                                <p className='text fw-600'>Product Details</p>
                            </div>
                            <div className="orderNum hideon600">
                                <p className='text fw-600'>Item Price</p>
                            </div>
                            <div className="orderNum">
                                <p className='text fw-600'>Quantity</p>
                            </div>
                            <div className="orderNum hideon400">
                                <p className='text fw-600'>Total Amount</p>
                            </div>
                        </div>

                        {invoice && invoice?.orderDetails && invoice?.orderDetails?.orderItems && invoice?.orderDetails?.orderItems?.length > 0 &&
                            invoice?.orderDetails?.orderItems.map((product, index) => (
                                <div className="order-product-content" key={index}>
                                    <div className="orderProduct">
                                        <img src={product.imageUrl} className="orderProductImg" alt="" />
                                        <div className="orderProductDetail">
                                            <p className='text fw-600'>{product.itemName}</p>
                                        </div>
                                    </div>
                                    <div className="orderNum hideon600">
                                        <p className='textSmol'>{Number(product.sellPrice).toFixed(2)}₹</p>
                                    </div>
                                    <div className="orderNum">
                                        <p className='textSmol'>{product.quantity}</p>
                                    </div>
                                    <div className="orderNum hideon400">
                                        <p className='textSmol fw-600'>{Number(product.totalAmount).toFixed(2)}₹</p>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="order-subtotal">
                        <div className="subtotalheading">
                            <p className='text'>Order Status :</p>
                            <p className='text'>Date :</p>
                            <p className='text'>Time :</p>
                            <p className='text'>Sub Total :</p>
                            <p className='text'>Shipping Charge :</p>
                            <p className='text'>Estimated Tax :</p>
                            <p className='text fw-600'>Total (INR) :</p>
                        </div>
                        <div className="subtotaldetail">
                            <p className='text'>{invoice?.orderDetails?.status}</p>
                            <p className='text'>{formattedDate(invoice?.orderDetails?.orderDate)}</p>
                            <p className='text'>{formattedTime(invoice?.orderDetails?.orderDate)}</p>
                            <p className='text'>Rs. {Number(invoice?.orderDetails?.totalPrice).toFixed(2)}₹</p>
                            <p className='text'>Rs. {Number(0).toFixed(2)}₹</p>
                            <p className='text'>Rs. {Number(0).toFixed(2)}₹</p>
                            <p className='text fw-600'>Rs. {Number(invoice?.orderDetails?.totalPrice).toFixed(2)}₹</p>
                        </div>
                    </div>
                </div>

                <div className="order-address">
                    <div className="flex center-space wh">
                        <p className='headingSmol'>Address</p>
                    </div>
                    <div className="flexcol start wh g5">
                        <p className='textSmol' style={{ textTransform: 'capitalize' }}>Name : {invoice?.buyer}</p>
                        <p className='textSmol' style={{ textTransform: 'capitalize' }}>Address : {invoice?.address?.address}</p>
                        <p className='textSmol' style={{ textTransform: 'capitalize' }}>Landmark : {invoice?.address?.landmark}</p>
                        <p className='textSmol' style={{ textTransform: 'capitalize' }}>City : {invoice?.address?.city}</p>
                        <p className='textSmol' style={{ textTransform: 'capitalize' }}>Pin Code : {invoice?.address?.pincode}</p>
                        <p className='textSmol' style={{ textTransform: 'capitalize' }}>Number : {invoice?.address?.phoneNumber}</p>
                    </div>
                </div>
            </div>
            }
        </Fragment>
    );
};

export default AdminOrderDetail;
