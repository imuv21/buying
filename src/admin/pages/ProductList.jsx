import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory } from '../../slices/productSlice';

import AdProductCard from '../../admin/components/AdProductCard';
import Loader from '../../components/Loader';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const ProductList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { catProducts, totalCatProducts, totalCatPages, catPageProducts, isFirstCat, isLastCat, hasNextCat, hasPreviousCat, getCatLoading, getCatError } = useSelector((state) => state.product);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [categoryParams] = useSearchParams();
    const categoryName = categoryParams.get('query');
    const [sortBy, setSortBy] = useState("salePrice");
    const [order, setOrder] = useState("asc");


    useEffect(() => {
        dispatch(getProductsByCategory({ page, size, category: categoryName, sortBy, order }));
    }, [dispatch, page, size, categoryName, sortBy, order]);


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


    if (getCatLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
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
                            <AdProductCard
                                id={pro._id}
                                title={pro.title}
                                originalPrice={pro.originalPrice}
                                salePrice={pro.salePrice}
                                ratings={pro.averageRating}
                                images={pro.images}
                                navigateToDetails={(id) => navigate(`/product-details/${id}`)}
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
        </Fragment>
    )
}

export default ProductList