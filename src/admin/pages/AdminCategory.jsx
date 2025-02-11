import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory } from '../../slices/productSlice';
import { deleteProduct } from '../../slices/adminSlice';
import { showToast } from '../../assets/Schemas';

import AdProductCard from '../components/AdProductCard';
import Loader from '../../components/Loader';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const AdminCategory = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { catProducts, totalCatProducts, totalCatPages, catPageProducts, isFirstCat, isLastCat, hasNextCat, hasPreviousCat, getCatLoading, getCatError } = useSelector((state) => state.product);

    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [proid, setProid] = useState(null);
    const [deleted, setDeleted] = useState(false);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [categoryParams] = useSearchParams();
    const categoryName = categoryParams.get('query');
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("asc");

    useEffect(() => {
        dispatch(getProductsByCategory({ page, size, category: categoryName, sortBy, order }));
    }, [dispatch, page, size, categoryName, sortBy, order]);


    const handleClickFooter = (id) => {
        setProid(id);
        setIsClickedFooter(true);
    };
    const closepopup = () => {
        setIsClickedFooter(false);
        setProid(null);
    };

    const handleDeleteProduct = async () => {
        if (deleted) return;
        setDeleted(true);
        try {
            const productId = proid;
            const response = await dispatch(deleteProduct(productId)).unwrap();

            if (response.status === "success") {
                console.log(response, response.message);
                showToast('success', `${response.message}`);
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setDeleted(false);
            closepopup();
        }
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

    const goBack = () => {
        navigate('/dashboard/category-list');
    }

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
            <div className="sortCat">
                <div className="flexcol start-center">
                    <article className='backSection'>
                        <ArrowBackIosNewIcon onClick={() => goBack()} />  <h1 className="heading" style={{ textTransform: 'capitalize' }}>{categoryName || `All Products`}</h1>
                    </article>
                    <p className="text" style={{ marginLeft: '30px' }}>Showing {catPageProducts || 0} of {totalCatProducts || 0} products</p>
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
                {getCatError ? (<p className='text'>Error loading products!</p>) : !getCatLoading && !getCatError &&
                    catProducts && catProducts.length > 0 ? catProducts.map((pro) => (
                        <Fragment key={pro._id}>
                            <AdProductCard
                                id={pro._id}
                                title={pro.title}
                                originalPrice={pro.originalPrice}
                                salePrice={pro.salePrice}
                                ratings={pro.averageRating}
                                images={pro.images}
                                onPopup={handleClickFooter}
                                navigateToDetails={(id) => navigate(`/dashboard/product-list/product-details/${id}`)}
                                navigateToEditProduct={(id) => navigate(`/dashboard/edit-product/${id}`)}
                            />
                        </Fragment>
                    )) : (<p className='text'>No products found!</p>)}
            </div>

            <div className="flex center w100">
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
            </div>

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        <form className="popup-wrapper" onSubmit={handleDeleteProduct}>
                            <h2 className="headingSmol">Are you sure?</h2>

                            <div className="flex w100 g10" style={{ justifyContent: 'space-between' }}>
                                <button type='submit' disabled={deleted}>{deleted ? 'Deleting...' : 'Yes'}</button>
                                <button type="button" onClick={closepopup}>No</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default AdminCategory;