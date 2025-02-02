import React, { useEffect, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getReviews, deleteReview, updateStatus } from '../../slices/userSlice';
import Loader from '../../components/Loader/Loader';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';


const ReviewsList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reviews, totalItems, totalPages, numberOfElements, isFirst, isLast, hasNext, hasPrevious, reviewLoading, reviewError } = useSelector((state) => state.user);
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState('PENDING');
    const [size, setSize] = useState(20);
    const [isDeleted, setIsDeleted] = useState({});
    const [isUpdating, setIsUpdating] = useState({});

    useEffect(() => {
        dispatch(getReviews({ page, status, size }));
    }, [dispatch, page, status, size]);

    const seeProduct = (id) => {
        navigate(`/dashboard/product-list/product-details/${id}`);
    }

    const deleteReviewHandle = async (reviewId) => {
        if (isDeleted[reviewId]) return;
        setIsDeleted((prevState) => ({ ...prevState, [reviewId]: true }));
        try {
            const { status } = await dispatch(deleteReview(reviewId)).unwrap();
            if (status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> Review deleted sucessfully!</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(getReviews({ page, size }));
            }
        } catch (error) {
            console.log(error);
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error deleting review!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsDeleted((prevState) => ({ ...prevState, [reviewId]: false }));
        }
    };

    const handleStatusChange = async (reviewId, newStatus) => {

        if (isUpdating[reviewId]) return;
        setIsUpdating((prev) => ({ ...prev, [reviewId]: true }));
        try {
            const response = await dispatch(updateStatus({ reviewId, status: newStatus })).unwrap();
            if (response.status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(getReviews({ page, status, size }));

            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsUpdating((prev) => ({ ...prev, [reviewId]: false }));
        }
    };

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
                    <h1 className="heading">Reviews List</h1>
                    {!reviewLoading && !reviewError && numberOfElements && totalItems && <p className="text">Showing {numberOfElements} of {totalItems} reviews</p>}
                </div>
                <select name="sort" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                </select>
            </article>

            <article className='usersList'>
                {reviewLoading ? (
                    <Loader />
                ) : reviewError ? (
                    <p>Error loading reviews!</p>
                ) : (
                    <Fragment>
                        <div className="userRowTwo">
                            <div className="index fw-600">index</div>
                            <div className="email fw-600">reviews</div>
                            <div className="seeBtns fw-600">action</div>
                        </div>

                        {reviews && reviews.length > 0 ? ( reviews.map((review, index) => (
                            <div className="userRowTwo" key={index}>
                                <div className="index">{index + 1}</div>
                                <div className="email">
                                    <div className="reviewAdCont">
                                        <div className="reviewAd">
                                            ({review.rating}/5) {review.description}
                                        </div>
                                        <div className="reviewAdImages">
                                            {review.image1 && <img src={review.image1} alt={`reviewImage-${index}`} /> }
                                            {review.image2 && <img src={review.image2} alt={`reviewImage-${index}`} /> }
                                        </div>
                                    </div>
                                </div>
                                <div className="seeBtns">
                                    <button onClick={() => seeProduct(review.productId)}>View</button>
                                    <button onClick={() => deleteReviewHandle(review.id)} disabled={isDeleted[review.id]}>{isDeleted[review.id] ? "Deleting..." : "Delete"}</button>
                                    
                                    <select name="status" value={review.status} onChange={(e) => handleStatusChange(review.id, e.target.value)} disabled={isUpdating[review.id]}>
                                        <option value="PENDING">Pending</option>
                                        <option value="APPROVED">Approved</option>
                                    </select>
                                </div>
                            </div>
                        ))) : (<p className='text flex start wh' style={{ padding: '40px' }}>No reviews found.</p>)}

                        {!reviewLoading && !reviewError && totalItems > size && (
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

export default ReviewsList