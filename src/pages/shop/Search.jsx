import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../assets/Schemas';
import { addCart, getProductsBySearch } from '../../slices/productSlice';

import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const Search = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { schProducts, totalSchProduct, totalSchPages, schPageProducts, isFirstSch, isLastSch, hasNextSch, hasPreviousSch, getSchLoading, getSchError } = useSelector((state) => state.product);
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
    const [searchParams] = useSearchParams();
    const keywords = searchParams.get('query');
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("asc");


    useEffect(() => {
        dispatch(getProductsBySearch({ page, size, search: keywords, sortBy, order }));
    }, [dispatch, page, size, keywords, sortBy, order]);


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
        if (newPage >= 1 && newPage <= totalSchPages) {
            setPage(newPage);
        }
    };
    const getPageNumbers = (currentPage, totalSchPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalSchPages, currentPage + 2);

        if (endPage - startPage < maxPageButtons - 1) {
            if (startPage === 1) {
                endPage = Math.min(totalSchPages, startPage + maxPageButtons - 1);
            } else if (endPage === totalSchPages) {
                startPage = Math.max(1, endPage - maxPageButtons + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers(page, totalSchPages);

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

    if (getSchLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
            <Helmet>
                <title>Buying - Search Products</title>
                <meta name="description" content="Explore a wide range of products with advanced filtering and sorting options. Find the best deals and compare prices effortlessly." />
                <link rel="canonical" href="https://buying.netlify.app/search-results" />
            </Helmet>

            <section className='page flexcol center'>
                <div className="sortCat">
                    <div className="flexcol">
                        <h1 className="text">Search results for - {keywords || 'No queries found!'}</h1>
                        <p className="text">Showing {schPageProducts || 0} of {totalSchProduct || 0} products</p>
                    </div>
                    <div className="flex center g10">
                        <select name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="">Sort By</option>
                            <option value="boughtCounter">Popularity</option>
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
                    {getSchError ? (<p className='text'>Error loading products!</p>) : !getSchLoading && !getSchError &&
                        schProducts && schProducts.length > 0 ? schProducts.map((pro) => (
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

                {!getSchLoading && !getSchError && totalSchProduct > size && (
                    <div className="pagination">
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(1)} disabled={isFirstSch}>
                                First Page
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPreviousSch}>
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
                            <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNextSch}>
                                Next
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(totalSchPages)} disabled={isLastSch}>
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
                                    <button type="button" onClick={() => (user ? addToCartHandler(proid, quantity, color, productSize) : login())} disabled={isAdded}>
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

export default Search;