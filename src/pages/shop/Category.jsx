import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../assets/Schemas';
import { getProductsByCategory } from '../../slices/productSlice';

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
    const [isAdded, setIsAdded] = useState(false);
    const [inStockData, setInStockData] = useState(false);
    const [proid, setProid] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [categoryParams] = useSearchParams();
    const categoryName = categoryParams.get('query');
    const [sortBy, setSortBy] = useState("salePrice");
    const [order, setOrder] = useState("asc");


    useEffect(() => {
        dispatch(getProductsByCategory({ page, size, category: categoryName, sortBy, order }));
    }, [dispatch, page, size, categoryName, sortBy, order]);


    const handleClickFooter = (id) => {
        setProid(id);
        setIsClickedFooter(true);
    };
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
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
                                    inStock={pro.inStock}
                                    ratings={pro.averageRating}
                                    images={pro.images}
                                    onPopup={handleClickFooter}
                                    onInStockChange={handleInStockChange}
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
            </section>
        </Fragment>
    );
};

export default Category;