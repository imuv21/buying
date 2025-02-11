import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../assets/Schemas';
import { getUsersByRole, makeUser } from '../../slices/adminSlice';
import Loader from '../../components/Loader';

import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const RoleManagement = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { rolUsers, getRolLoading, getRolError, totalRolUsers, totalRolPages, rolPageUsers, isFirstRol, isLastRol, hasNextRol, hasPreviousRol, } = useSelector((state) => state.admin);

    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [role, setRole] = useState("Manager");
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("asc");


    useEffect(() => {
        dispatch(getUsersByRole({ page, size, role, sortBy, order }));
    }, [dispatch, page, size, role, sortBy, order]);


    const handleClickFooter = (userId) => {
        setSelectedUserId(userId);
        setIsClickedFooter(true);
    };
    const closepopup = () => {
        setSelectedUserId(null);
        setIsClickedFooter(false);
    };

    const handleSubmit = async () => {
        if (isSubmitted) return;
        setIsSubmitted(true);
        try {
            const response = await dispatch(makeUser(selectedUserId)).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
                closepopup();
                dispatch(getUsersByRole({ page, size, role, sortBy, order }));
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsSubmitted(false);
        }
    };


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

    const goToAddManager = () => {
        navigate('/dashboard/add-manager');
    }

    useEffect(() => {
        const handleScroll = () => {
            if (isClickedFooter) {
                setIsClickedFooter(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isClickedFooter]);

    if (getRolLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
            <div className="sortCat">
                <div className="flexcol">
                    <h1 className="heading">Manager List</h1>
                    <p className="text">Showing {rolPageUsers || 0} of {totalRolUsers || 0} managers</p>
                </div>

                <div className="flex center g10">
                    <button onClick={() => goToAddManager()}>Add Manager</button>
                    <select name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Sort By</option>
                        <option value="firstName">Name</option>
                        <option value="email">Email</option>
                    </select>

                    <div className="orderfilter" onClick={toggleOrder}>
                        {order === "asc" ? <NorthIcon /> : <SouthIcon />}
                    </div>
                </div>
            </div>

            <div className='usersList'>
                {getRolError ? (<p className='text'>Error loading managers!</p>) : (
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
                                    <button onClick={() => handleClickFooter(user._id)}>Remove</button>
                                </div>
                            </div>
                        )) : (<p className='text'>No managers found!</p>)}
                    </Fragment>
                )}
            </div>

            <div className="flex center w100">
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
            </div>

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        <form className="popup-wrapper" style={{ gap: '10px' }} onSubmit={handleSubmit}>
                            <h1 className="headingSmol">Are you sure?</h1>

                            <div className="flex center w100 g20" style={{ marginTop: '15px' }}>
                                <button type='submit' disabled={isSubmitted}>{isSubmitted ? 'Removing...' : 'Yes'}</button>
                                <button type="button" onClick={closepopup}>No</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

        </Fragment>
    )
}

export default RoleManagement