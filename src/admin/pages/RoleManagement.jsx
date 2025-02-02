import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../slices/userSlice';
import { makeUser } from '../../slices/adminSlice';
import Loader from '../../components/Loader/Loader';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';



const RoleManagement = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, totalItems, totalPages, numberOfElements, isFirst, isLast, hasNext, hasPrevious, userLoading, userError } = useSelector((state) => state.user);
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [userType, setUserType] = useState("ADMIN");

    useEffect(() => {
        dispatch(getUsers({ page, userType, size }));
    }, [dispatch, page, userType, size]);

    const handleClickFooter = (userId) => {
        setSelectedUserId(userId);
        setIsClickedFooter(true);
    };
    const closepopup = (event) => {
        event.preventDefault();
        setSelectedUserId(null);
        setIsClickedFooter(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        setIsSubmitted(true);
        try {
            const response = await dispatch(makeUser(selectedUserId)).unwrap();

            if (response.status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> Admin successfully changed to user</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(getUsers({ page, userType, size }));
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error updating profile!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setSelectedUserId(null);
            setIsSubmitted(false);
            setIsClickedFooter(false);
        }
    };

    const gotoadmin = () => {
        navigate('/dashboard/add-new-admin');
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

    if (userLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
            <article className="sortCat">
                <div className="flexcol g5">
                    <h1 className="heading">Role Management</h1>
                    {!userLoading && !userError && numberOfElements && totalItems && <p className="text">Showing {numberOfElements} of {totalItems} admins</p>}
                </div>
                <button onClick={gotoadmin}>Add New Admin</button>
            </article>

            <article className='usersList'>
                { userError ? (
                    <p>Error loading admins!</p>
                ) : (
                    <Fragment>
                        <div className="userRow">
                            <div className="index fw-600">Index</div>
                            <div className="email fw-600">Full Name</div>
                            <div className="email fw-600">Email</div>
                            <div className="seeBtns fw-600">Action</div>
                        </div>

                        {users && users.length > 0 && users.map((user, index) => (
                            <div className="userRow" key={user.userId}>
                                <div className="index">{index + 1}</div>
                                <div className="email">{`${user.firstname} ${user.lastname}`}</div>
                                <div className="email">{user.email}</div>
                                <div className="seeBtns">
                                    <button onClick={() => handleClickFooter(user.userId)}>Remove</button>
                                </div>
                            </div>
                        ))}

                        {!userLoading && !userError && totalItems > size && (
                            <div className="pagination" style={{ marginTop: '50px' }}>
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
                    </Fragment>
                )}
            </article>

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        <form className="popup-wrapper" style={{ gap: '10px' }} onSubmit={handleSubmit}>
                            <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Are you sure?</h2>

                            <div className="flex wh g10" style={{ marginTop: '15px', justifyContent: 'space-between' }}>
                                <button type='submit' className="applyBtn" disabled={isSubmitted}>{isSubmitted ? 'Removing...' : 'Yes'}</button>
                                <button type="button" className="applyBtn" onClick={closepopup}>No</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

        </Fragment>
    )
}

export default RoleManagement