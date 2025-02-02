import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getAdminOrders, updateOrderStatus } from '../../slices/adminOrderSlice';
import Loader from '../../components/Loader/Loader';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';



const OrdersList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, totalItems, totalPages, numberOfElements, isFirst, isLast, hasNext, hasPrevious, loading, error } = useSelector((state) => state.adminOrder);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [status, setStatus] = useState("PLACED");
    const [isUpdating, setIsUpdating] = useState({});

    useEffect(() => {
        dispatch(getAdminOrders({ page, size, status }));
    }, [dispatch, page, size, status]);

    const handleStatusChange = async (orderId, newStatus) => {

        if (isUpdating[orderId]) return;
        setIsUpdating((prev) => ({ ...prev, [orderId]: true }));
        try {
            const response = await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
            if (response.status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(getAdminOrders({ page, size, status }));
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsUpdating((prev) => ({ ...prev, [orderId]: false }));
        }
    };

    const seeOrder = (id) => {
        navigate(`/dashboard/orders-list/order-details/${id}`);
    }

    //pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };
    const getPageNumbers = (currentPage, totalPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5;

        let startPage = Math.max(0, currentPage - 2);
        let endPage = Math.min(totalPages - 1, currentPage + 2);

        if (endPage - startPage < maxPageButtons - 1) {
            if (startPage === 0) {
                endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);
            } else if (endPage === totalPages - 1) {
                startPage = Math.max(0, endPage - maxPageButtons + 1);
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers(page, totalPages);

    return (
        <Fragment>
            <article className="sortCat">
                <div className="flexcol g5">
                    <h1 className="heading">Orders List</h1>
                    {!loading && !error && numberOfElements && totalItems && <p className="text">Showing {numberOfElements} of {totalItems} orders</p>}
                </div>
                <select name="sort" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="PLACED">Placed</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                </select>
            </article>

            <article className='usersList'>
                <div className="userRow">
                    <div className="index fw-600">index</div>
                    <div className="email fw-600">order ID</div>
                    <div className="email fw-600">email</div>
                    <div className="datePriceNum fw-600">total products</div>
                    <div className="datePriceNum fw-600">total price</div>
                    <div className="seeBtns fw-600">status</div>
                </div>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <p className="text">Error loading orders...</p>
                ) : orders && orders.length > 0 ? (orders.map((order, index) => (
                    <div className="userRow" key={index}>
                        <div className="index">{index + 1}</div>
                        <div className="email">{order.orderId?.length > 20 ? `${order.orderId.substring(0, 20)}...` : order.orderId}</div>
                        <div className="email">{order.username?.length > 20 ? `${order.username.substring(0, 20)}...` : order.username}</div>
                        <div className="datePriceNum">{order.noOfProducts}</div>
                        <div className="datePriceNum">Rs. {Number(order.totalPrice).toFixed(2)}</div>
                        <div className="seeBtns">
                            <select name="status" value={order.status} onChange={(e) => handleStatusChange(order.orderId, e.target.value)} disabled={isUpdating[order.orderId]} >
                                <option value="PLACED">Placed</option>
                                <option value="SHIPPED">Shipped</option>
                                <option value="DELIVERED">Delivered</option>
                            </select>
                            <button onClick={() => seeOrder(order.orderId)}>View</button>
                        </div>
                    </div>
                ))) : (<p className='text flex start wh' style={{ padding: '40px' }}>No orders found.</p>)}

                {!loading && !error && totalItems > size && (
                    <div className="pagination">
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(0)} disabled={isFirst}>
                                First Page
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPrevious}>
                                Previous
                            </button>
                        </div>
                        <div className="flex wh" style={{ gap: '10px' }}>
                            {pageNumbers.map(index => (
                                <button key={index} className={`pagination-btn ${index === page ? 'active' : ''}`} onClick={() => handlePageChange(index)}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNext}>
                                Next
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(totalPages - 1)} disabled={isLast}>
                                Last Page
                            </button>
                        </div>
                    </div>
                )}
            </article>
        </Fragment>
    )
}

export default OrdersList