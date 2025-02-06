import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersByRole } from '../../slices/adminSlice';
import Loader from '../../components/Loader';

import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const UsersList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { rolUsers, getRolLoading, getRolError, totalRolUsers, totalRolPages, rolPageUsers, isFirstRol, isLastRol, hasNextRol, hasPreviousRol } = useSelector((state) => state.admin);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [role, setRole] = useState("User");
    const [sortBy, setSortBy] = useState("firstName");
    const [order, setOrder] = useState("asc");


    useEffect(() => {
        dispatch(getUsersByRole({ page, size, role, sortBy, order }));
    }, [dispatch, page, size, role, sortBy, order]);


    const seeOrders = (id) => {
        navigate(`/dashboard/user-list/user-orders/${id}`);
    }
    const seeReviews = (id) => {
        navigate(`/dashboard/user-list/user-reviews/${id}`);
    }


    //pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalRolPages) {
            setPage(newPage);
        }
    };
    const getPageNumbers = (currentPage, totalRolPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalRolPages, currentPage + 2);

        if (endPage - startPage < maxPageButtons - 1) {
            if (startPage === 1) {
                endPage = Math.min(totalRolPages, startPage + maxPageButtons - 1);
            } else if (endPage === totalRolPages) {
                startPage = Math.max(1, endPage - maxPageButtons + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers(page, totalRolPages);

    const toggleOrder = () => {
        setOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    };


    if (getRolLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
            <div className="sortCat">
                <div className="flexcol">
                    <h1 className="heading" style={{ textTransform: 'capitalize' }}>User List</h1>
                    <p className="text">Showing {rolPageUsers} of {totalRolUsers} users</p>
                </div>

                <div className="flex center g10">
                    <select name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="firstName">Name</option>
                        <option value="email">Email</option>
                    </select>

                    <div className="orderfilter" onClick={toggleOrder}>
                        {order === "asc" ? <NorthIcon /> : <SouthIcon />}
                    </div>
                </div>
            </div>

            <article className='usersList'>
                { getRolError ? (<p className='text'>Error loading users!</p>) : (
                    <Fragment>
                        <div className="userRow">
                            <div className="index fw-800">Index</div>
                            <div className="email fw-800">Full Name</div>
                            <div className="email fw-800">Email</div>
                            <div className="seeBtns fw-800">Action</div>
                        </div>

                        {rolUsers && rolUsers.length > 0 ? rolUsers.map((user, index) => (
                            <div className="userRow" key={user._id}>
                                <div className="index">{index + 1}</div>
                                <div className="email">{`${user.firstName} ${user.lastName}`}</div>
                                <div className="email">{user.email}</div>
                                <div className="seeBtns">
                                    <button onClick={() => seeOrders(user._id)}>Orders</button>
                                    <button onClick={() => seeReviews(user._id)}>Reviews</button>
                                </div>
                            </div>
                        )) : (<p className='text'>No users found!</p>)}

                        {!getRolLoading && !getRolError && totalRolUsers > size && (
                            <div className="pagination">
                                <div className="flex wh" style={{ gap: '10px' }}>
                                    <button className='pagination-btn' onClick={() => handlePageChange(1)} disabled={isFirstRol}>
                                        First Page
                                    </button>
                                    <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPreviousRol}>
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
                                    <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNextRol}>
                                        Next
                                    </button>
                                    <button className='pagination-btn' onClick={() => handlePageChange(totalRolPages)} disabled={isLastRol}>
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

export default UsersList