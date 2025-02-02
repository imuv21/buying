import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewsAdmin } from '../../assets/schemas';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Reviews = () => {

    const navigate = useNavigate();

    const back = () => {
        navigate('/dashboard/user-list');
    }
    const seeProduct = (id) => {
        navigate(`/dashboard/product-list/product-details/${id}`);
    }

    return (
        <Fragment>
            <article className="sortCat">
                <div className="backSection">
                    <ArrowBackIosNewIcon onClick={back} /> <h1 className="heading">Reviews</h1>
                </div>
                <select name="sort">
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                </select>
            </article>

            <article className='usersList'>
                <div className="userRowTwo">
                    <div className="index fw-600">index</div>
                    <div className="email fw-600">reviews</div>
                    <div className="seeBtns fw-600">action</div>
                </div>

                {reviewsAdmin && reviewsAdmin.length > 0 && reviewsAdmin.map((review, index) => (
                    <div className="userRowTwo" key={index}>
                        <div className="index">{index + 1}</div>
                        <div className="email">
                            <div className="reviewAdCont">
                                <div className="reviewAd">
                                    ({review.rating}/5) {review.review}
                                </div>
                                <div className="reviewAdImages">
                                    {review.reviewImages && review.reviewImages?.length > 0 && review.reviewImages.map((img) => (
                                        <img src={img} alt={`reviewImage-${index}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="seeBtns">
                            <button onClick={() => seeProduct(review.productId)}>View</button>
                            <button>Delete</button>
                            <select name="status" value={review.reviewStatus} onChange={(e) => { const newStatus = e.target.value; }}>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                            </select>
                        </div>
                    </div>
                ))}
            </article>
        </Fragment>
    )
}

export default Reviews