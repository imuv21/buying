import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../assets/Schemas';
import { getOrders } from '../../slices/adminSlice';
import Loader from '../../components/Loader';

import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const OrdersList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, orderLoading, orderError, totalOrders, totalOrderPages, pageOrders, isFirstOrd, isLastOrd, hasNextOrd, hasPreviousOrd } = useSelector((state) => state.admin);

    const [isUpdating, setIsUpdating] = useState({});
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [sortBy, setSortBy] = useState("orderDate");
    const [order, setOrder] = useState("asc");


    useEffect(() => {
        dispatch(getOrders({ page, size, sortBy, order }));
    }, [dispatch, page, size, sortBy, order]);


    const handleStatusChange = async (orderId, newStatus) => {

        if (isUpdating[orderId]) return;
        setIsUpdating((prev) => ({ ...prev, [orderId]: true }));
        try {
            // const response = await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
            // if (response.status === "success") {
            //     showToast('success', `${response.message}`);
            // } else {
            //     showToast('error', `${response.message}`);
            // }
        } catch (error) {
           showToast('error', 'Something went wrong!');
        } finally {
            setIsUpdating((prev) => ({ ...prev, [orderId]: false }));
        }
    };
    const seeOrder = (id) => {
        navigate(`/dashboard/orders-list/order-details/${id}`);
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
            <div className="sortCat">
                <div className="flexcol">
                    <h1 className="heading" style={{ textTransform: 'capitalize' }}>Order List</h1>
                    <p className="text">Showing {pageOrders} of {totalOrders} orders</p>
                </div>

                <div className="flex center g10">
                    <select name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="orderDate">Time</option>
                        <option value="totalAmount">Price</option>
                    </select>

                    <div className="orderfilter" onClick={toggleOrder}>
                        {order === "asc" ? <NorthIcon /> : <SouthIcon />}
                    </div>
                </div>
            </div>

            <article className='usersList'>
                {orderError ? (<p className='text'>Error loading orders!</p>) : (
                    <Fragment>
                        <div className="userRow">
                            <div className="index fw-600">Index</div>
                            <div className="email fw-600">Order ID</div>
                            <div className="datePriceNum fw-600">Total Products</div>
                            <div className="datePriceNum fw-600">Total Price</div>
                            <div className="seeBtns fw-600">Action</div>
                        </div>

                        {orders && orders.length > 0 ? orders.map((order, index) => (
                            <div className="userRow" key={order._id}>
                                <div className="index">{index + 1}</div>
                                <div className="email">{order._id}</div>
                                <div className="datePriceNum">{order.itemsCount}</div>
                                <div className="datePriceNum">{order.totalAmount}</div>
                                <div className="seeBtns">
                                    <select name="status" value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} disabled={isUpdating[order._id]} >
                                        <option value="Placed">Placed</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                    <button onClick={() => seeOrder(order._id)}>View</button>
                                </div>
                            </div>
                        )) : (<p className='text'>No orders found!</p>)}

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
                    </Fragment>
                )}
            </article>
        </Fragment>
    )
}

export default OrdersList