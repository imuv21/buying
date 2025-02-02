import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTransition, animated } from '@react-spring/web';
import { fetchProductDetails } from '../../slices/productSlice';
import Loader from '../../components/Loader/Loader';
import freedelivery from '../../assets/images/icons8-delivery-100.png';
import cod from '../../assets/images/icons8-cash-on-delivery-100.png';
import returns from '../../assets/images/icons8-return-purchase-100.png';
import payment from '../../assets/images/icons8-secure-payment-100.png';
import delivery from '../../assets/images/icons8-delivery.png';

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';





const ProductDetailAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { pDetails, pdLoading, pdError } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProductDetails(id));
    }, [dispatch, id]);

    const [quantity, setQuantity] = useState(1);
    const discountPercentage = ((pDetails?.originalPrice - pDetails?.salePrice) / pDetails?.originalPrice) * 100;
    const price = (pDetails?.salePrice || 0) * quantity;
    const ogPrice = (pDetails?.originalPrice || 0) * quantity;


    //stars
    const fivestar = Number(pDetails?.fiveStar ?? 0);
    const fourstar = Number(pDetails?.fourStar ?? 0);
    const threestar = Number(pDetails?.threeStar ?? 0);
    const twostar = Number(pDetails?.twoStar ?? 0);
    const onestar = Number(pDetails?.oneStar ?? 0);

    const totalreviews = fivestar + fourstar + threestar + twostar + onestar;
    const ratings = [{ stars: 5, count: fivestar }, { stars: 4, count: fourstar }, { stars: 3, count: threestar }, { stars: 2, count: twostar }, { stars: 1, count: onestar }];

    const getStars = (ratings) => {
        const numericRating = Number(ratings) || 0;
        const fullStars = Math.floor(numericRating);
        const decimalPart = numericRating % 1;
        const halfStar = decimalPart >= 0.25 && decimalPart <= 0.75 ? 1 : 0;
        const adjustedFullStars = decimalPart >= 0.75 ? fullStars + 1 : fullStars;
        const emptyStars = Math.max(5 - adjustedFullStars - halfStar, 0);
        return { fullStars: Math.min(adjustedFullStars, 5), halfStar, emptyStars };
    };

    const rating = totalreviews > 0 ? ((fivestar * 5 + fourstar * 4 + threestar * 3 + twostar * 2 + onestar * 1) / totalreviews).toFixed(1) : 0;

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


    //image slider

    const images = pDetails?.image?.slice(0, 5).map((img) => img.imageUrl) || [];
    const inStock = pDetails?.stock > 0 ? true : false;
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


    //dates
    const today = new Date();
    const deliveryStart = new Date(today);
    deliveryStart.setDate(today.getDate() + 1);
    const deliveryEnd = new Date(today);
    deliveryEnd.setDate(today.getDate() + 5);

    const options = { month: 'short', day: 'numeric' };
    const formattedDeliveryStart = deliveryStart.toLocaleDateString('en-US', options);
    const formattedDeliveryEnd = deliveryEnd.toLocaleDateString('en-US', options);


    //reviews and questions list toggle
    const [activeSection, setActiveSection] = useState("reviews");

    const handleToggle = (section) => {
        setActiveSection(section);
    };

    const back = () => {
        navigate('/dashboard/product-list');
    }

    const dont = false;

    if (pdLoading) {
        return <Loader />;
    }
    if (pdError) {
        return <p className="text">Error loading product details...</p>
    }


    return (
        <Fragment>
            <Helmet>
                <title>Product Details - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/product-details" />
            </Helmet>

            <Fragment>
                <div className="backSection">
                    <ArrowBackIosNewIcon onClick={back} /> <h1 className="heading">Product Detail</h1>
                </div>

                <section className='pdCont'>
                    <article className="pdContImg">
                        {images.length > 0 ? (
                            <>
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
                            </>
                        ) : (
                            <div>No images available</div>
                        )}
                    </article>

                    <article className='pdContDetail'>
                        <h1 className='headingSmol'>{pDetails?.name}</h1>
                        <div className="starContTwo">
                            {[...Array(fullStars || 0)].map((_, i) => (
                                <span key={`full-${i}`} className="starTwo"><StarIcon /></span>
                            ))}
                            {halfStar === 1 && (
                                <span className="starTwo"><StarHalfIcon /></span>
                            )}
                            {[...Array(emptyStars || 0)].map((_, i) => (
                                <span key={`empty-${i}`} className="dullStarTwo"><StarOutlineIcon /></span>
                            ))}
                            &nbsp;&nbsp;&nbsp;<span className="textBig">{rating}</span>
                        </div>
                        <div className='flexcol start-center'>
                            <div className='flex center g10'>
                                <p className='product-discounTwo'>Rs. {Number(ogPrice).toFixed(2)}₹</p>
                                <p className='product-priceTwo'>Rs. {Number(price).toFixed(2)}₹</p>
                                <div className='discount-iconTwo'>{discountPercentage.toFixed(0)}% OFF</div>
                            </div>
                            <p className="product-discounTwo" style={{ textDecoration: 'none' }}>Tax included.</p>
                        </div>
                        <div className="plusMinusCont">
                            <div onClick={increase}><AddIcon /></div>
                            <input type="number" value={quantity} onChange={handleQuantity} min={1} />
                            <div onClick={decrease}><RemoveIcon /></div>
                        </div>
                        <div className="flex center g20">
                            <button className='payBtn'>Add to cart</button>
                            <div className="stock" style={{ backgroundColor: inStock ? 'var(--codeFive)' : '#ff7979' }}>
                                {inStock ? `In Stock` : 'Out of Stock'}
                            </div>
                        </div>
                        <p className='textBig proDetext'>{pDetails?.info}</p>
                        <div className="pdFeatureIcons">
                            <div><img src={freedelivery} alt="delivery" /><p className="text">Free Delivery</p></div>
                            <div><img src={cod} alt="pay-on-delivery" /><p className="text">Pay on Delivery</p></div>
                            <div><img src={returns} alt="returns" /><p className="text">Easy Returns</p></div>
                            <div><img src={payment} alt="secure-payment" /><p className="text">Secure Payment</p></div>
                        </div>
                        <div className="flex end-start wh g15 estimated">
                            <img src={delivery} alt="delivery" /> <p className='text'> Estimated Delivery: {formattedDeliveryStart} - {formattedDeliveryEnd} </p>
                        </div>
                    </article>
                </section>

                <section className='ratings'>
                    <article><h1 className='heading'>Customer Reviews</h1></article>
                    <article className='ratingCont'>

                        <div className='ratingBox g5'>
                            <div className="flex center wh">
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
                                    <div className='starContThree'>
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
                            <button className='payBtn' >Write a review</button>
                            <div className="text">OR</div>
                            <button style={{ border: 'none' }} >Ask a question</button>
                        </div>

                    </article>
                </section>

                <section className='randqCont'>
                    
                    <div className="sortToggle">
                        <div className="flex center g10">
                            <button className={activeSection === "reviews" ? "toggleBtn active" : "toggleBtn"} onClick={() => handleToggle("reviews")}>Reviews</button>
                            <button className={activeSection === "questions" ? "toggleBtn active" : "toggleBtn"} onClick={() => handleToggle("questions")}>Questions</button>
                        </div>
                        {dont && <select className={`reviewListSort ${activeSection === "reviews" ? "visible" : "hidden"}`} name="sort" id="sort">
                            <option value="pictureonly">Pictures Only</option>
                            <option value="high">Highest Rating</option>
                            <option value="low">Lowest Rating</option>
                        </select>}
                    </div>

                    <article className={`reviewList ${activeSection === "reviews" ? "visible" : "hidden"}`}>
                        {pDetails && pDetails.review && pDetails.review.length > 0 ? (pDetails.review.map((item, index) => {
                            const { fullReviewStars, halfReviewStar, emptyReviewStars } = getReviewStars(item.rating);
                            return (
                                <div key={index} className="reviewBox">
                                    <div className="starContFive">
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
                                    <div className="reviewprocont">
                                        <AccountCircleIcon /> <p className="textBig">{item.reviewerName}</p>
                                    </div>
                                    <p className="text cap">{item.description}</p>
                                    <div className="reviewImages">
                                        {item.image1 && <img src={item.image1} alt={`Review-image ${index + 1}`} />}
                                        {item.image2 && <img src={item.image2} alt={`Review-image ${index + 1}`} />}
                                    </div>
                                </div>
                            )
                        })) : (<p className='text flex start wh' style={{ padding: '40px' }}>No reviews available for this product.</p>)}
                    </article>

                    <article className={`questionList ${activeSection === "questions" ? "visible" : "hidden"}`}>
                        {pDetails && pDetails.question && pDetails.question.length > 0 ? (pDetails.question.map((item, index) => {
                            return (
                                <div key={index} className="questionBox">
                                    <div className="questionprocont">
                                        <AccountCircleIcon /> <p className="textBig">{item.username}</p>
                                    </div>
                                    <p className="text">{item.question}</p>
                                    <div className="reply"><p className='textBig'>Herbal Jivan:</p> <p className="text">{item.answer ? `${item.answer}` : `No reply yet!`}</p></div>
                                </div>
                            )
                        })) : (<p className='text flex start wh' style={{ padding: '40px' }}>No questions available for this product.</p>)}
                    </article>

                </section>
            </Fragment>
        </Fragment>
    );
};

export default ProductDetailAdmin;