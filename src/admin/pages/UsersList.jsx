import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../slices/userSlice';
import Loader from '../../components/Loader/Loader';


const UsersList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users, totalItems, totalPages, numberOfElements, isFirst, isLast, hasNext, hasPrevious, userLoading, userError } = useSelector((state) => state.user);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [sort, setSort] = useState("A_TO_Z");

    useEffect(() => {
        dispatch(getUsers({ page, size, sort }));
    }, [dispatch, page, size, sort]);

    const seeOrders = (id) => {
        navigate(`/dashboard/user-list/user-orders/${id}`);
    }
    const seeReviews = (id) => {
        navigate(`/dashboard/user-list/user-reviews/${id}`);
    }
    const seeQuestions = (id) => {
        navigate(`/dashboard/user-list/user-questions/${id}`);
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
                    <h1 className="heading">Users List</h1>
                    {!userLoading && !userError && numberOfElements && totalItems && <p className="text">Showing {numberOfElements} of {totalItems} users</p>}
                </div>
                <select name="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="NEWEST">Newest</option>
                    <option value="A_TO_Z">Alphabetically A to Z</option>
                    <option value="Z_TO_A">Alphabetically Z to A</option>
                </select>
            </article>

            <article className='usersList'>
                {userLoading ? (
                    <Loader />
                ) : userError ? (
                    <p>Error loading users!</p>
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
                                    <button onClick={() => seeOrders(user.userId)}>Orders</button>
                                    <button onClick={() => seeReviews(user.userId)}>Reviews</button>
                                    <button onClick={() => seeQuestions(user.userId)}>Questions</button>
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
        </Fragment>
    )
}

export default UsersList