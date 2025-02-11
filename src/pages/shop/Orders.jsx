import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateTime, showToast } from '../../assets/Schemas';
import { cancelOrder, getUserOrders } from '../../slices/authSlice';
import Loader from '../../components/Loader';

import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const Orders = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders, orderLoading, orderError, totalOrders, totalOrderPages, pageOrders, isFirstOrd, isLastOrd, hasNextOrd, hasPreviousOrd } = useSelector((state) => state.auth);

    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("desc");

    useEffect(() => {
        dispatch(getUserOrders({ page, size, status, sortBy, order }));
    }, [dispatch, page, size, status, sortBy, order]);


    const handleClickFooter = (orderId) => {
        setSelectedOrderId(orderId);
        setIsClickedFooter(true);
    };
    const closepopup = () => {
        setSelectedOrderId(null);
        setIsClickedFooter(false);
    };

    const handleSubmit = async () => {
        if (isSubmitted) return;
        setIsSubmitted(true);
        try {
            const response = await dispatch(cancelOrder(selectedOrderId)).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
                closepopup();
                dispatch(getUserOrders({ page, size, status, sortBy, order }));
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsSubmitted(false);
        }
    };

    const seeOrder = (orderId) => {
        navigate(`/order-details/${orderId}`);
    }

    //pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalOrderPages) {
            setPage(newPage);
        }
    };
    const getPageNumbers = (currentPage, totalOrderPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalOrderPages, currentPage + 2);

        if (endPage - startPage < maxPageButtons - 1) {
            if (startPage === 1) {
                endPage = Math.min(totalOrderPages, startPage + maxPageButtons - 1);
            } else if (endPage === totalOrderPages) {
                startPage = Math.max(1, endPage - maxPageButtons + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers(page, totalOrderPages);

    const toggleOrder = () => {
        setOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    };

    if (orderLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
            <Helmet>
                <title>Buying - Your Orders</title>
                <meta name="description" content="Access and manage your orders on Buying. View detailed order histories, cancel orders anytime, and stay updated on your purchases for a seamless shopping experience." />
                <link rel="canonical" href="https://buying.netlify.app/orders" />
            </Helmet>

            <section className='page flexcol center'>
                <div className="sortCat">
                    <div className="flexcol">
                        <h1 className="heading" style={{ textTransform: 'capitalize' }}>Your Orders</h1>
                        <p className="text">Showing {pageOrders || 0} of {totalOrders || 0} orders</p>
                    </div>

                    <div className="flex center g10">
                        <select name="statusFilter" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Filter</option>
                            <option value="Placed">Placed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                        <select name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="">Sort By</option>
                            <option value="orderDate">Time</option>
                            <option value="totalAmount">Price</option>
                        </select>

                        <div className="orderfilter" onClick={toggleOrder}>
                            {order === "asc" ? <NorthIcon /> : <SouthIcon />}
                        </div>
                    </div>
                </div>

                <div className="orderBoxCont">
                    {orderError ? (<p className='text'>Error loading orders!</p>) :
                        orders && orders.length > 0 ? orders.map((order) => (
                            <div className="orderBox" key={order._id}>
                                <div className="orderSubBox">
                                    <div className="text fw-800" style={{ marginBottom: '5px' }}>Order Id: {order._id}</div>
                                    <div className="text">Order Status: {order.status}</div>
                                    <div className="text">Total Products: {order.itemsCount}</div>
                                    <div className="text">Total Price: {order.totalAmount}</div>
                                    <div className="text">Date & Time: {formatDateTime(order.orderDate)}</div>
                                </div>
                                <div className="OrderBtns">
                                    <button onClick={() => seeOrder(order._id)} style={{ padding: '5px 15px' }}>View</button>
                                    {order.status !== "Delivered" && order.status !== "Cancelled" && <button onClick={() => handleClickFooter(order._id)} className='remove-btn'>Cancel</button>}
                                </div>
                            </div>
                        )) : (<p className='text'>No orders found!</p>)
                    }
                </div>

                {!orderLoading && !orderError && totalOrders > size && (
                    <div className="pagination">
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(1)} disabled={isFirstOrd}>
                                First Page
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPreviousOrd}>
                                Previous
                            </button>
                        </div>
                        <div className="flex wh" style={{ gap: '10px' }}>
                            {pageNumbers.map(index => (
                                <button key={index} className={`pagination-btn ${index === page ? 'active' : ''}`} onClick={() => handlePageChange(index)}>
                                    {index}
                                </button>
                            ))}
                        </div>
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNextOrd}>
                                Next
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(totalOrderPages)} disabled={isLastOrd}>
                                Last Page
                            </button>
                        </div>
                    </div>
                )}

                <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                    {isClickedFooter && (
                        <div className="popup">
                            <form className="popup-wrapper" style={{ gap: '10px' }} onSubmit={handleSubmit}>
                                <h1 className="headingSmol">Are you sure?</h1>

                                <div className="flex center w100 g20" style={{ marginTop: '15px' }}>
                                    <button type='submit' disabled={isSubmitted}>{isSubmitted ? 'Cancelling...' : 'Yes'}</button>
                                    <button type="button" onClick={closepopup}>No</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        </Fragment>
    );
};

export default Orders;