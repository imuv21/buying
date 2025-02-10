import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, getAllReviews } from '../../slices/adminSlice';
import { showToast } from '../../assets/Schemas';
import Loader from '../../components/Loader';

import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const ReviewsList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reviewLoading, reviewError, reviews, totalReviews, totalReviewPages, pageReviews, isFirstRev, isLastRev, hasNextRev, hasPreviousRev } = useSelector((state) => state.admin);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("asc");
    const [isDeleted, setIsDeleted] = useState({});

    useEffect(() => {
        dispatch(getAllReviews({ page, size, sortBy, order }));
    }, [dispatch, page, size, sortBy, order]);


    const deleteReviewHandle = async (productId, reviewId) => {
        if (isDeleted[reviewId]) return;
        setIsDeleted((prevState) => ({ ...prevState, [reviewId]: true }));
        try {
            const response = await dispatch(deleteReview({ productId, reviewId })).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
                dispatch(getAllReviews({ page, size, sortBy, order }));
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsDeleted((prevState) => ({ ...prevState, [reviewId]: false }));
        }
    };

    const seeProduct = (id) => {
        navigate(`/dashboard/product-list/product-details/${id}`);
    }


    //pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalReviewPages) {
            setPage(newPage);
        }
    };
    const getPageNumbers = (currentPage, totalReviewPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalReviewPages, currentPage + 2);

        if (endPage - startPage < maxPageButtons - 1) {
            if (startPage === 1) {
                endPage = Math.min(totalReviewPages, startPage + maxPageButtons - 1);
            } else if (endPage === totalReviewPages) {
                startPage = Math.max(1, endPage - maxPageButtons + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers(page, totalReviewPages);

    const toggleOrder = () => {
        setOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    };


    if (reviewLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
            <div className="sortCat">
                <div className="flexcol">
                    <h1 className="heading">Review List</h1>
                    <p className="text">Showing {pageReviews || 0} of {totalReviews || 0} reviews</p>
                </div>

                <div className="flex center g10">
                    <select name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Sort By</option>
                        <option value="createdAt">Time</option>
                        <option value="rating">Rating</option>
                    </select>

                    <div className="orderfilter" onClick={toggleOrder}>
                        {order === "asc" ? <NorthIcon /> : <SouthIcon />}
                    </div>
                </div>
            </div>

            <article className='usersList'>
                {reviewError ? (<p className='text'>Error loading reviews!</p>) : (
                    <Fragment>
                        <div className="userRowTwo">
                            <div className="index fw-800">Index</div>
                            <div className="email fw-800">Reviews</div>
                            <div className="seeBtns fw-800">Action</div>
                        </div>

                        {reviews && reviews.length > 0 ? (reviews.map((review, index) => (
                            <div className="userRowTwo" key={review.reviewId}>
                                <div className="index">{index + 1}</div>
                                <div className="email">
                                    <div className="reviewAdCont">
                                        <div className="reviewAd">
                                            ({review.rating}/5) {review.review}
                                        </div>
                                    </div>
                                </div>
                                <div className="seeBtns">
                                    <button onClick={() => seeProduct(review._id)}>View</button>
                                    <button className='remove-btn' onClick={() => deleteReviewHandle(review._id, review.reviewId)} disabled={isDeleted[review.reviewId]}>{isDeleted[review.reviewId] ? "Deleting..." : "Delete"}</button>
                                </div>
                            </div>
                        ))) : (<p className='text'>No reviews found!</p>)}
                    </Fragment>
                )}
            </article>

            <div className="flex center w100">
                {!reviewLoading && !reviewError && totalReviews > size && (
                    <div className="pagination">
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(1)} disabled={isFirstRev}>
                                First Page
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPreviousRev}>
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
                            <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNextRev}>
                                Next
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(totalReviewPages)} disabled={isLastRev}>
                                Last Page
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default ReviewsList