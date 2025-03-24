import React, { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, getCart } from '../slices/productSlice';
import { showToast } from '../assets/Schemas';
import Loader from '../components/Loader';
import Grid from '../components/Grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import tshirt from '../assets/images/tshirt.webp';
import hoodie from '../assets/images/hoodie.webp';
import girl from '../assets/images/hero_girl_optimized_0321-1024x819-1-300x240.jpg';
const TextSlider = lazy(() => import('../components/TextSlider'));


const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [proid, setProid] = useState(null);
    const [stocksData, setStocksData] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [productSize, setProductSize] = useState("");
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);


    const handleClickFooter = (id, stocks) => {
        setProid(id);
        setStocksData(stocks);
        setIsClickedFooter(true);
    };
    const closepopup = () => {
        setIsClickedFooter(false);
        setProid(null);
        setQuantity(1);
        setColor("");
        setProductSize("");
        setStocksData(0);
    };

    //quantity
    const increase = () => {
        if (quantity >= stocksData) {
            return showToast('error', `Out of stock!`);
        } else if (quantity >= 10) {
            return showToast('error', `You can't add more than 10 products!`);
        }
        setQuantity((prev) => prev + 1);
    };
    const decrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    //login, add to cart
    const addToCartHandler = async (proid, quantity, color, productSize) => {
        if (isAdded) return;
        if (!color || !productSize) {
            return showToast('error', 'Please pick color and size first!');
        }
        setIsAdded(true);
        try {
            const cartData = { productId: proid, quantity, color, size: productSize };
            const response = await dispatch(addCart(cartData)).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
                closepopup();
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsAdded(false);
        }
    };
    const login = () => {
        navigate('/register');
    };
    const goToCat = () => {
        navigate('/category');
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


    return (
        <Fragment>
            <Helmet>
                <title>Buying - Best Deals, Affordable Shopping</title>
                <meta name="description" content="Explore the best deals on a wide range of products at Buying. Your one-stop online shop for quality items at unbeatable prices. Shop now and save big!" />
                <link rel="canonical" href="https://buying.netlify.app" />
            </Helmet>

            <Suspense fallback={<Loader />}>
                <TextSlider />
            </Suspense>

            <section className='page flexcol center'>

                <div className="couponCont">
                    <div className="couponBoxTwo">
                        <p className="headingBig">Upto 10% Off!</p>
                        <p className="headingSmol">Use Coupon - buying10</p>
                        <p className="textBig">Explore the largest collection of very special T-Shirts & Hoodies at extraordinary sale prices.</p>
                        <button onClick={() => goToCat()}>Browse All Designs</button>
                    </div>
                    <div className="couponBox">
                        <img src={girl} alt="girl" />
                    </div>
                </div>
                <Grid heading={"Featured Products"} link={'/category'} onPopup={handleClickFooter} />

                <h1 className='headingBig'>Shop By Category</h1>

                <div className="categoryCont">
                    <Link to={'/category?query=T-Shirts'} className="catBox">
                        <img src={tshirt} alt="T-Shirts" />
                        <p className="heading">T-Shirts</p>
                    </Link>
                    <Link to={'/category?query=Hoodies'} className="catBox">
                        <img src={hoodie} alt="Hoodies" />
                        <p className="heading">Hoodies</p>
                    </Link>
                </div>

                <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                    {isClickedFooter && (
                        <div className="popup">
                            <form className="popup-wrapper" style={{ gap: '10px' }}>
                                <h1 className="headingSmol">Add To Cart</h1>

                                <div className="flexcol center g5 w100" style={{ marginTop: '15px' }}>
                                    <select name="color" id="color" value={color} onChange={(e) => setColor(e.target.value)}>
                                        <option value="">Select Color</option>
                                        <option value="black">Black</option>
                                        <option value="gray">Gray</option>
                                    </select>
                                    <select name="productSize" id="productSize" value={productSize} onChange={(e) => setProductSize(e.target.value)}>
                                        <option value="">Select Size</option>
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                        <option value="xlarge">X Large</option>
                                        <option value="2xlarge">2X Large</option>
                                        <option value="3xlarge">3X Large</option>
                                    </select>
                                    <div className="quantity-controls">
                                        <button type="button" onClick={decrease}><RemoveIcon /></button>
                                        <div className="quantity">{quantity}</div>
                                        <button type="button" onClick={increase}><AddIcon /></button>
                                    </div>
                                </div>

                                <div className="flex center w100 g20" style={{ marginTop: '15px' }}>
                                    <button type='button' onClick={() => (user ? addToCartHandler(proid, quantity, color, productSize) : login())} disabled={isAdded}>
                                        {isAdded ? 'Adding...' : 'Add to cart'}
                                    </button>
                                    <button type="button" className="applyBtn" onClick={closepopup}>No</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        </Fragment>
    );
};

export default Home;