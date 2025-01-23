import React, { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import { addToCart, getCart } from '../slices/cartSlice';
// import { fetchProducts } from '../slices/productSlice';
import Sliders from 'react-slick';
import Loader from './Loader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { products } from '../assets/Schemas';
const ProductCard = lazy(() => import('./ProductCard'));


const Carousel = ({ heading, link }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { products, getProLoading, getProError } = useSelector((state) => state.product);
    const user = useSelector((state) => state.auth.user);

    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [inStockData, setInStockData] = useState(false);
    const [proid, setProid] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // useEffect(() => {
    //     dispatch(fetchProducts({ page, size }));
    // }, [dispatch, page, size]);


    const handleClickFooter = (id) => {
        setProid(id);
        setIsClickedFooter(true);
    };
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
    };

    const NextArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '1', right: '0%' }} onClick={onClick}>
                <ChevronRightIcon />
            </div>
        );
    };
    const PrevArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '1' }} onClick={onClick}>
                <ChevronLeftIcon />
            </div>
        );
    };
    const settings = {
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 7,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1240,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1030,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow: null,
                    prevArrow: null,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: null,
                    prevArrow: null,
                },
            },
        ],
    };


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

    const handleInStockChange = (inStock) => {
        setInStockData(inStock);
    };

    //login, add to cart
    const addToCartHandler = async (proid, quantity) => {
        if (isAdded) return;
        setIsAdded(true);
        try {
            // await dispatch(addToCart({ productId: proid, quantity })).unwrap();
            toast(<div className='flex center g5'> < VerifiedIcon /> {`${quantity} item${quantity > 1 ? 's' : ''} added to cart!`}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            // dispatch(getCart());

        } catch (error) {
            console.error('Failed to add item to cart:', error);
            toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsAdded(false);
            setIsClickedFooter(false);
        }
    };
    const login = () => {
        navigate('/login');
    };

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

    // if (getProLoading) {
    //     return <Loader />;
    // }

    return (
        <Fragment>
            <article className='gridHeading'><h1 className='headingBig'>{heading}</h1> <a href={link} className="textBig">See All</a></article>

            <div className={`product-slider-cont`}>
                <Sliders {...settings}>
                    {/* {getProError && <p className="text">Error loading products...</p>} */}
                    {Array.isArray(products) && products.length > 0 && products.map((pro) => (
                        <div className='show-img-detail-sup' key={pro.productId}>
                            <Suspense fallback={<Loader />}>
                                <ProductCard
                                    name={pro.name}
                                    id={pro.productId}
                                    images={pro.image}
                                    ratings={pro.ratings}
                                    originalPrice={pro.originalPrice}
                                    salePrice={pro.salePrice}
                                    stock={pro.stock}
                                    onPopup={handleClickFooter}
                                    onInStockChange={handleInStockChange}
                                    navigateToDetails={(id) => navigate(`/product-details/${id}`)}
                                />
                            </Suspense>
                        </div>
                    ))}
                </Sliders>
            </div>

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        <form className="popup-wrapper" style={{ gap: '10px' }}>
                            <h1 className="headingSmol">Add To Cart</h1>

                            <div className="flex center g20" style={{ marginTop: '15px' }}>
                                <div className="plusMinusCont">
                                    <div onClick={increase}><AddIcon /></div>
                                    <input type="number" value={quantity} onChange={handleQuantity} min={1} />
                                    <div onClick={decrease}><RemoveIcon /></div>
                                </div>
                                <div className="stock" style={{ backgroundColor: inStockData ? 'var(--codeFive)' : '#ff7979' }}>
                                    {inStockData ? `In Stock` : 'Out of Stock'}
                                </div>
                            </div>

                            <div className="flex center g20" style={{ marginTop: '15px' }}>
                                <button className='buyNow' onClick={() => (user ? addToCartHandler(proid, quantity) : login())} disabled={isAdded || !inStockData}>{isAdded ? 'Adding...' : 'Add to cart'}</button>
                                <button type="button" className="applyBtn" onClick={closepopup}>No</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Carousel;