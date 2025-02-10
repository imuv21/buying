import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFeatured, removeFromFeatured } from '../../slices/adminSlice';
import { showToast } from '../../assets/Schemas';

import FeatProCard from '../../admin/components/FeatProCard';
import Loader from '../../components/Loader';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const Featured = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { featProducts, totalFeatProducts, totalFeatPages, featPageProducts, isFirstFeat, isLastFeat, hasNextFeat, hasPreviousFeat, getFeatLoading, getFeatError } = useSelector((state) => state.admin);

    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [proid, setProid] = useState(null);
    const [deleted, setDeleted] = useState(false);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("asc");


    useEffect(() => {
        dispatch(getFeatured({ page, size, sortBy, order }));
    }, [dispatch, page, size, sortBy, order]);


    const handleClickFooter = (id) => {
        setProid(id);
        setIsClickedFooter(true);
    };
    const closepopup = () => {
        setIsClickedFooter(false);
        setProid(null);
    };

    const handleRemoveProduct = async () => {
        if (deleted) return;
        setDeleted(true);
        try {
            const productId = proid;
            const response = await dispatch(removeFromFeatured(productId)).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
                dispatch(getFeatured({ page, size, sortBy, order }));
                closepopup();
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setDeleted(false);
        }
    };

    //pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalFeatPages) {
            setPage(newPage);
        }
    };
    const getPageNumbers = (currentPage, totalFeatPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalFeatPages, currentPage + 2);

        if (endPage - startPage < maxPageButtons - 1) {
            if (startPage === 1) {
                endPage = Math.min(totalFeatPages, startPage + maxPageButtons - 1);
            } else if (endPage === totalFeatPages) {
                startPage = Math.max(1, endPage - maxPageButtons + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers(page, totalFeatPages);

    const toggleOrder = () => {
        setOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const goToAddFeature = () => {
        navigate('/dashboard/add-new-featured-products');
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

    if (getFeatLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
            <div className="sortCat">
                <div className="flexcol">
                    <h1 className="heading">All Products</h1>
                    <p className="text">Showing {featPageProducts || 0} of {totalFeatProducts || 0} products</p>
                </div>

                <div className="flex center g10">
                    <button onClick={() => goToAddFeature()}>Add Featured</button>
                    <select name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Sort By</option>
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
                {getFeatError ? (<p className='text'>Error loading featured products!</p>) : !getFeatLoading && !getFeatError &&
                    featProducts && featProducts.length > 0 ? featProducts.map((pro) => (
                        <Fragment key={pro._id}>
                            <FeatProCard
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
                    )) : (<p className='text'>No featured products found!</p>)}
            </div>

            <div className="flex center w100">
                {!getFeatLoading && !getFeatError && totalFeatProducts > size && (
                    <div className="pagination">
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(1)} disabled={isFirstFeat}>
                                First Page
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPreviousFeat}>
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
                            <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNextFeat}>
                                Next
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(totalFeatPages)} disabled={isLastFeat}>
                                Last Page
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        <form className="popup-wrapper" onSubmit={handleRemoveProduct}>
                            <h2 className="headingSmol">Are you sure?</h2>

                            <div className="flex w100 g10" style={{ justifyContent: 'space-between' }}>
                                <button type='submit' disabled={deleted}>{deleted ? 'Removing...' : 'Yes'}</button>
                                <button type="button" onClick={closepopup}>No</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default Featured