import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../assets/Schemas';
import { addCart, getProductsByCategory } from '../../slices/productSlice';

import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const Category = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { catProducts, totalCatProducts, totalCatPages, catPageProducts, isFirstCat, isLastCat, hasNextCat, hasPreviousCat, getCatLoading, getCatError } = useSelector((state) => state.product);
    const user = useSelector((state) => state.auth.user);

    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [proid, setProid] = useState(null);
    const [stocksData, setStocksData] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [productSize, setProductSize] = useState("");
    const [isAdded, setIsAdded] = useState(false);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [categoryParams] = useSearchParams();
    const categoryName = categoryParams.get('query');
    const [sortBy, setSortBy] = useState("salePrice");
    const [order, setOrder] = useState("asc");


    useEffect(() => {
        dispatch(getProductsByCategory({ page, size, category: categoryName, sortBy, order }));
    }, [dispatch, page, size, categoryName, sortBy, order]);


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

    //pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalCatPages) {
            setPage(newPage);
        }
    };
    const getPageNumbers = (currentPage, totalCatPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalCatPages, currentPage + 2);

        if (endPage - startPage < maxPageButtons - 1) {
            if (startPage === 1) {
                endPage = Math.min(totalCatPages, startPage + maxPageButtons - 1);
            } else if (endPage === totalCatPages) {
                startPage = Math.max(1, endPage - maxPageButtons + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers(page, totalCatPages);

    const toggleOrder = () => {
        setOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
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

    if (getCatLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
            <Helmet>
                <title>Buying - Products By Category</title>
                <meta name="description" content="Discover products organized by category at Buying. Effortlessly browse, sort by price, title, ratings, and more, with pagination for seamless navigation. Find exactly what you need in our curated collections." />
                <link rel="canonical" href="https://buying.netlify.app/category" />
            </Helmet>

            <section className='page flexcol center'>
                <div className="sortCat">
                    <div className="flexcol">
                        <h1 className="heading" style={{ textTransform: 'capitalize' }}>{categoryName || `All Products`}</h1>
                        <p className="text">Showing {catPageProducts} of {totalCatProducts} products</p>
                    </div>

                    <div className="flex center g10">
                        <select name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="salePrice">Price</option>
                            <option value="title">Title</option>
                            <option value="averageRating">Ratings</option>
                        </select>

                        <div className="orderfilter" onClick={toggleOrder}>
                            {order === "asc" ? <NorthIcon /> : <SouthIcon />}
                        </div>
                    </div>
                </div>

                <div className="categoryGrid">
                    {getCatError ? (<p className='text'>Error loading products!</p>) : !getCatLoading && !getCatError &&
                        catProducts && catProducts.length > 0 ? catProducts.map((pro) => (
                            <Fragment key={pro._id}>
                                <ProductCard
                                    id={pro._id}
                                    title={pro.title}
                                    originalPrice={pro.originalPrice}
                                    salePrice={pro.salePrice}
                                    stocks={pro.stocks}
                                    ratings={pro.averageRating}
                                    images={pro.images}
                                    onPopup={handleClickFooter}
                                    navigateToDetails={(id) => navigate(`/product-details/${id}`)}
                                />
                            </Fragment>
                        )) : (<p className='text'>No products found!</p>)}
                </div>

                {!getCatLoading && !getCatError && totalCatProducts > size && (
                    <div className="pagination">
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(1)} disabled={isFirstCat}>
                                First Page
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPreviousCat}>
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
                            <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNextCat}>
                                Next
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(totalCatPages)} disabled={isLastCat}>
                                Last Page
                            </button>
                        </div>
                    </div>
                )}

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

export default Category;