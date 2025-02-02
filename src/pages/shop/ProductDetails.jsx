import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTransition, animated } from '@react-spring/web';
import { getProductDetails, getReviews } from '../../slices/productSlice';
import { addReview, clearErrors } from '../../slices/authSlice';
import { showToast } from '../../assets/Schemas';
import DOMPurify from 'dompurify';
import Loader from '../../components/Loader';

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';



const ProductDetails = () => {

    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const { productDetails, getDetailsLoading, getDetailsError, proRevLoading, proRevError, proReviews, totalProRev, totalProRevPages,
        pageProRev, isFirstProRev, isLastProRev, hasNextProRev, hasPreviousProRev } = useSelector((state) => state.product);
    const { addRevLoading, addRevErrors, addRevError } = useSelector((state) => state.auth);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState("desc");
    const initialState = {
        reviewText: '',
        rating: ''
    };
    const [formValues, setFormValues] = useState(initialState);

    useEffect(() => {
        dispatch(getProductDetails(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        dispatch(getReviews({ page, size, sortBy, order, productId }));
    }, [dispatch, page, size, sortBy, order, productId]);


    const [quantity, setQuantity] = useState(1);
    const [showReview, setShowReview] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [revSubmitted, setRevSubmitted] = useState(false);

    const discountPercentage = ((productDetails?.originalPrice - productDetails?.salePrice) / productDetails?.originalPrice) * 100;
    const price = (productDetails?.salePrice || 0) * quantity;
    const ogPrice = (productDetails?.originalPrice || 0) * quantity;
    const isDiscount = price < ogPrice;

    const onestar = Number(productDetails?.oneStar ?? 0);
    const twostar = Number(productDetails?.twoStar ?? 0);
    const threestar = Number(productDetails?.threeStar ?? 0);
    const fourstar = Number(productDetails?.fourStar ?? 0);
    const fivestar = Number(productDetails?.fiveStar ?? 0);

    const totalreviews = fivestar + fourstar + threestar + twostar + onestar;
    const ratings = [{ stars: 5, count: fivestar }, { stars: 4, count: fourstar }, { stars: 3, count: threestar }, { stars: 2, count: twostar }, { stars: 1, count: onestar }];

    const images = productDetails?.images || [];
    const inStock = productDetails?.inStock || false;

    //image slider
    const [index, setIndex] = useState(0);
    const interval = 4000;

    useEffect(() => {
        if (index >= images.length) {
            setIndex(0);
        }
    }, [images.length, index]);

    useEffect(() => {
        if (images.length > 0) {
            const timer = setInterval(() => {
                setIndex((prev) => (prev + 1) % images.length);
            }, interval);
            return () => clearInterval(timer);
        }
    }, [images.length, interval]);

    const transitions = useTransition(index, {
        key: images.length > 0 ? index : null,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 1000 },
    });

    const handlePrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
    const handleNext = () => setIndex((prev) => (prev + 1) % images.length);


    //quantity
    const increase = () => {
        setQuantity((prev) => prev + 1);
    };
    const decrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };
    const handleQuantity = (e) => {
        const value = parseInt(e.target.value, 10) || 1;
        setQuantity(value > 0 ? value : 1);
    };


    //login, add to cart
    const addToCartHandler = async (proid, quantity) => {
        if (isAdded) return;
        setIsAdded(true);
        try {
            // await dispatch(addToCart({ productId: proid, quantity })).unwrap();
            // toast(<div className='flex center g5'> < VerifiedIcon /> {`${quantity} item${quantity > 1 ? 's' : ''} added to cart!`}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });

        } catch (error) {
            console.error('Failed to add item to cart:', error);
        } finally {
            setIsAdded(false);
            setIsClickedFooter(false);
        }
    };
    const login = () => {
        navigate('/register');
    };
    const gotowhatsapp = (title) => {
        const message = `Hi, I’d like to customize this merch named "${title}".`;
        window.open(
            `https://wa.me/+919026075867?text=${encodeURIComponent(message)}`,
            '_blank',
            'noopener,noreferrer'
        );
    };


    //pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalProRevPages) {
            setPage(newPage);
        }
    };
    const getPageNumbers = (currentPage, totalProRevPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalProRevPages, currentPage + 2);

        if (endPage - startPage < maxPageButtons - 1) {
            if (startPage === 1) {
                endPage = Math.min(totalProRevPages, startPage + maxPageButtons - 1);
            } else if (endPage === totalProRevPages) {
                startPage = Math.max(1, endPage - maxPageButtons + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers(page, totalProRevPages);

    const toggleOrder = () => {
        setOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    };


    //dates
    const today = new Date();
    const deliveryStart = new Date(today);
    deliveryStart.setDate(today.getDate() + 6);
    const deliveryEnd = new Date(today);
    deliveryEnd.setDate(today.getDate() + 7);
    const options = { month: 'short', day: 'numeric' };
    const formattedDeliveryStart = deliveryStart.toLocaleDateString('en-US', options);
    const formattedDeliveryEnd = deliveryEnd.toLocaleDateString('en-US', options);

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        if (isNaN(date)) return null;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${day} ${month} ${year}, ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    };



    //stars
    const getStars = (ratings) => {
        const numericRating = Number(ratings) || 0;
        const fullStars = Math.floor(numericRating);
        const decimalPart = numericRating % 1;
        const halfStar = decimalPart >= 0.25 && decimalPart <= 0.75 ? 1 : 0;
        const adjustedFullStars = decimalPart >= 0.75 ? fullStars + 1 : fullStars;
        const emptyStars = Math.max(5 - adjustedFullStars - halfStar, 0);
        return { fullStars: Math.min(adjustedFullStars, 5), halfStar, emptyStars };
    };
    const rating = productDetails?.averageRating || 0;
    const { fullStars, halfStar, emptyStars } = getStars(rating);
    const calculatePercentage = (count) => ((count / totalreviews) * 100).toFixed(2);

    const getReviewStars = (ratings) => {
        const numericRating = Number(ratings) || 0;
        const fullReviewStars = Math.floor(numericRating);
        const decimalPart = numericRating % 1;
        const halfReviewStar = decimalPart >= 0.25 && decimalPart <= 0.75 ? 1 : 0;
        const adjustedFullReviewStars = decimalPart >= 0.75 ? fullReviewStars + 1 : fullReviewStars;
        const emptyReviewStars = Math.max(5 - adjustedFullReviewStars - halfReviewStar, 0);
        return { fullReviewStars: Math.min(adjustedFullReviewStars, 5), halfReviewStar, emptyReviewStars };
    };


    //reviews & question forms
    const [star, setStar] = useState(0);
    const handleStarClick = (index) => {
        setStar(index + 1);
        dispatch(clearErrors());
    };

    const showReviewForm = () => {
        setShowReview((prev) => {
            const newState = !prev;
            if (newState) {
                setTimeout(() => {
                    const formElement = document.getElementById('reviewForm');
                    if (formElement) {
                        const currentScrollY = window.scrollY || window.pageYOffset;
                        const yOffset = -130;
                        const yPosition = formElement.getBoundingClientRect().top + currentScrollY + yOffset;
                        window.scrollTo({ top: yPosition, behavior: 'smooth' });
                    }
                }, 100);
            }
            return newState;
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        dispatch(clearErrors());
    };

    const getProfError = (field) => Array.isArray(addRevErrors) ? addRevErrors.find(error => error.path === field) : null;
    const reviewTextError = getProfError('reviewText');
    const ratingError = getProfError('rating');


    const reviewSubmit = async (e) => {
        e.preventDefault();
        if (revSubmitted) return;
        if (reviewTextError || ratingError) {
            showToast('error', 'Please fix the errors before submitting the form!');
            return;
        }
        setRevSubmitted(true);
        try {
            const reviewData = {
                productId: productId,
                reviewText: DOMPurify.sanitize(formValues.reviewText),
                rating: star
            };
            const response = await dispatch(addReview(reviewData)).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
                dispatch(getReviews({ page, size, sortBy, order, productId }));
                setFormValues(initialState);
                setShowReview(false);
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setRevSubmitted(false);
        }
    };


    if (getDetailsLoading) {
        return <Loader />;
    }
    if (getDetailsError) {
        return <p className="text">Error loading product details!</p>
    }


    return (
        <Fragment>
            <Helmet>
                <title>Buying - Product Details</title>
                <meta name="description" content="Explore detailed information about our exclusive T-shirts and hoodies on Buying. Find the perfect merch with top-quality fabric, unique designs, and great deals." />
                <link rel="canonical" href="https://buying.netlify.app/product-details" />
            </Helmet>

            <section className='page flexcol center'>
                <article className='flex center-start w100'><h1 className='text' style={{ textTransform: 'uppercase' }}>{productDetails?.category}</h1></article>

                <section className='pdCont'>
                    <article className="pdContImg">
                        {images.length > 0 ? (
                            <Fragment>
                                <div className="slider-containerpd">
                                    {transitions((style, i) => (
                                        <animated.div className="slide" style={style}>
                                            <img src={images[i]} alt={`Slide ${i}`} className="slide-imagepd" />
                                        </animated.div>
                                    ))}
                                    <div className="arrows">
                                        <span className="arrow left"><ArrowCircleLeftIcon onClick={handlePrev} /></span>
                                        <span className="arrow right" ><ArrowCircleRightIcon onClick={handleNext} /></span>
                                    </div>
                                    <div className="dots">
                                        {images.map((_, i) => (
                                            <span key={i} className={`dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)}></span>
                                        ))}
                                    </div>
                                </div>
                                <div className="smallImages">
                                    {images.map((img, i) => (
                                        <img key={i} src={img} alt={`image${i + 1}`} className={`smolImg ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} />
                                    ))}
                                </div>
                            </Fragment>
                        ) : (
                            <p className='text'>No images available!</p>
                        )}
                    </article>

                    <article className='pdContDetail'>
                        <h1 className='heading'>{productDetails?.title}</h1>
                        <div className="pdSubContDetail">
                            <div className="starCont">
                                {[...Array(fullStars || 0)].map((_, i) => (
                                    <span key={`full-${i}`} className="starTwo"><StarIcon /></span>
                                ))}
                                {halfStar === 1 && (
                                    <span className="starTwo"><StarHalfIcon /></span>
                                )}
                                {[...Array(emptyStars || 0)].map((_, i) => (
                                    <span key={`empty-${i}`} className="dullStarTwo"><StarOutlineIcon /></span>
                                ))}
                                &nbsp;&nbsp;&nbsp;<span className="textBig">({rating})</span>
                            </div>
                            <div className='flexcol start-center'>
                                <div className='flex center g10'>
                                    <p className='product-discounTwo' style={isDiscount ? { textDecoration: 'line-through', color: 'var(--codeThree)' } : { textDecoration: 'none', color: 'var(--codeFour)' }}>
                                        Rs. {Number(ogPrice).toFixed(2)}₹
                                    </p>
                                    {isDiscount &&
                                        <Fragment>
                                            <p className='product-priceTwo'>Rs. {Number(price).toFixed(2)}₹</p>
                                            <div className='discount-iconTwo'>{discountPercentage.toFixed(0)}% OFF</div>
                                        </Fragment>
                                    }
                                    <div className="discount-iconTwo" style={{ backgroundColor: inStock ? 'var(--codeFive)' : 'var(--redCode)' }}>
                                        {inStock ? `In Stock` : 'Out of Stock'}
                                    </div>
                                </div>
                                <p className="text">Tax Included.</p>
                            </div>
                        </div>
                        <div className="pdcartdetail">
                            <select name="color" id="color">
                                <option value="">Select Color</option>
                                <option value="black">Black</option>
                                <option value="gray">Gray</option>
                            </select>
                            <select name="size" id="size">
                                <option value="">Select Size</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="xlarge">X Large</option>
                                <option value="2xlarge">2X Large</option>
                                <option value="3xlarge">3X Large</option>
                            </select>
                            <div className="flex g10 w100">
                                <div className="plusMinusCont">
                                    <div onClick={increase}><AddIcon /></div>
                                    <input type="number" value={quantity} onChange={handleQuantity} min={1} />
                                    <div onClick={decrease}><RemoveIcon /></div>
                                </div>
                                <button onClick={() => (user ? addToCartHandler(id, quantity) : login())} disabled={isAdded || !inStock}>{isAdded ? 'Adding...' : 'Add to cart'}</button>
                            </div>
                            <button onClick={() => gotowhatsapp(productDetails?.title)}>Customize This Product</button>
                        </div>
                        <div className="pdSubContDetail">
                            <p className='text'>Estimated Delivery: {formattedDeliveryStart} - {formattedDeliveryEnd}</p>
                            <p className="text">Stock Status: {inStock ? 'In Stock' : 'Out of Stock'}</p>
                            <p className="text">Fabric Brand – Bio Wash Cotton</p>
                            <p className="text">Printing Technology Used – DTG Printing</p>
                            <p className="text">Shipping Weight – 450 Grams</p>
                            <p className="text">Customization Available, no size replacement.</p>
                        </div>
                    </article>
                </section>

                <section className="info">
                    <h1 className='headingSmol'>Description</h1>
                    <p className="text">{productDetails?.information}</p>
                    <div className="flex center-start w100">
                        {productDetails && productDetails.tags && productDetails.tags.length > 0 ?
                            (productDetails.tags.map((tag) => (
                                <p className="text">#{tag}&nbsp;&nbsp;</p>
                            ))) : (<p className='text'>No tags found!</p>)}
                    </div>
                </section>

                <section className='ratings'>
                    <article><h1 className='heading'>Customer Ratings</h1></article>
                    <article className='ratingCont'>
                        <div className='ratingBox g5'>
                            <div className="flex center w100">
                                {[...Array(fullStars || 0)].map((_, i) => (
                                    <span key={`full-${i}`} className="starTwo"><StarIcon /></span>
                                ))}
                                {halfStar === 1 && (
                                    <span className="starTwo"><StarHalfIcon /></span>
                                )}
                                {[...Array(emptyStars || 0)].map((_, i) => (
                                    <span key={`empty-${i}`} className="dullStarTwo"><StarOutlineIcon /></span>
                                ))}
                            </div>
                            <p className="textBig">{rating} out of 5</p>
                            <p className='textBig'>based on {totalreviews} reviews</p>
                        </div>
                        <div className='ratingBox'>
                            {ratings.map((rating) => (
                                <div key={rating.stars} className='ratingline'>
                                    <div className='starCont'>
                                        {[...Array(rating.stars)].map((_, i) => (
                                            <span key={`full-${i}`} className="starThree"><StarIcon /></span>
                                        ))}
                                        {[...Array(5 - rating.stars)].map((_, i) => (
                                            <span key={`empty-${i}`} className="dullStarThree"><StarOutlineIcon /></span>
                                        ))}
                                    </div>
                                    <div className='line'>
                                        <div className='yellowline' style={{ width: `${calculatePercentage(rating.count)}%`, }}></div>
                                    </div>
                                    <p>{rating.count}</p>
                                </div>
                            ))}
                        </div>
                        <div className='ratingBox g5'>
                            <button style={{ width: 'fit-content' }} onClick={showReviewForm}>Write a review</button>
                        </div>
                    </article>
                </section>

                <form onSubmit={reviewSubmit} className={`reviewForm ${showReview ? 'visible' : 'hidden'}`} id="reviewForm">
                    <h1 className='headingSmol'>Give your rating</h1>
                    <div className="starCont" style={{ gap: '4px' }}>
                        {[...Array(5)].map((_, i) => (
                            <span key={`rating-${i}`} className={i < star ? 'starFour' : 'dullStarFour'} onClick={() => handleStarClick(i)}>
                                {i < star ? <StarIcon /> : <StarOutlineIcon />}
                            </span>
                        ))}
                    </div>
                    {ratingError && <p className="error">{ratingError.msg}</p>}
                    <h2 className='headingSmol'>Write a review</h2>
                    <textarea name="reviewText" placeholder="Write your review here..." rows="6" cols="50" value={formValues.reviewText} onChange={handleChange} />
                    {reviewTextError && <p className="error">{reviewTextError.msg}</p>}
                    {addRevError && <p className="error">{addRevError}</p>}

                    {user ?
                        <button type='submit' disabled={revSubmitted || addRevLoading}>{(revSubmitted || addRevLoading) ? 'Submitting...' : 'Submit'}</button> :
                        <button onClick={() => login()} >Login To Write Review</button>
                    }
                </form>

                <section className='randqCont'>
                    <div className="sortToggle">
                        <div className="flexcol">
                            <h1 className='heading'>Reviews</h1>
                            <p className="textSmol">Showing {pageProRev} of {totalProRev} reviews</p>
                        </div>
                        <div className="flex center g10">
                            <select name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="createdAt">Time & Date</option>
                                <option value="rating">Ratings</option>
                            </select>
                            <div className="orderfilter" onClick={toggleOrder}>
                                {order === "asc" ? <NorthIcon /> : <SouthIcon />}
                            </div>
                        </div>
                    </div>
                    {proRevLoading ? (<Loader />) : proRevError ? (<p className='text'>Error loading reviews!</p>) :
                        proReviews && proReviews.length > 0 ? proReviews.map((review) => {
                            const { fullReviewStars, halfReviewStar, emptyReviewStars } = getReviewStars(review.rating);
                            return (
                                <div className="reviewBox" key={review.id}>
                                    <div className="reviewprocont">
                                        <div className="revsubcont">
                                            <div className="flex center g10">
                                                <span className='userProfile'><AccountCircleIcon /></span> <p className="textBig">{`${review.firstName} ${review.lastName}`}</p>
                                            </div>
                                            <div className="starCont">
                                                {[...Array(fullReviewStars || 0)].map((_, i) => (
                                                    <span key={`full-${i}`} className="starFive"><StarIcon /></span>
                                                ))}
                                                {halfReviewStar === 1 && (
                                                    <span className="starFive"><StarHalfIcon /></span>
                                                )}
                                                {[...Array(emptyReviewStars || 0)].map((_, i) => (
                                                    <span key={`empty-${i}`} className="dullStarFive"><StarOutlineIcon /></span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="textSmol">{formatDateTime(review.createdAt)}</p>
                                    </div>
                                    <p className="text">{review.review}</p>
                                </div>
                            )
                        }) : (<p className='text'>No reviews found!</p>)
                    }
                </section>

                {!proRevLoading && !proRevError && totalProRev > size && (
                    <div className="pagination">
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(1)} disabled={isFirstProRev}>
                                First Page
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPreviousProRev}>
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
                            <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNextProRev}>
                                Next
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(totalProRevPages)} disabled={isLastProRev}>
                                Last Page
                            </button>
                        </div>
                    </div>
                )}

            </section>
        </Fragment>
    );
};

export default ProductDetails;