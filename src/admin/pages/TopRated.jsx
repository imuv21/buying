import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts } from '../../slices/adminProductSlice';
import Loader from '../../components/Loader/Loader';
import ProductCard from '../../components/ProductCard';


const TopRated = () => {

    const dispatch = useDispatch();
    const { products, totalItems, totalPages, numberOfElements, isFirst, isLast, hasNext, hasPrevious, getProLoading, getProError } = useSelector((state) => state.adminProduct);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [sort, setSort] = useState("RATING_HIGH_TO_LOW");
    const [type, setType] = useState("TOP_RATED");
    const deleteIcon = false;

    useEffect(() => {
        dispatch(fetchAdminProducts({ page, size, sort, type }));
    }, [dispatch, page, size, sort, type]);


    //pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };
    const getPageNumbers = (currentPage, totalPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5;

        let startPage = Math.max(0, currentPage - 2);
        let endPage = Math.min(totalPages - 1, currentPage + 2);

        if (endPage - startPage < maxPageButtons - 1) {
            if (startPage === 0) {
                endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);
            } else if (endPage === totalPages - 1) {
                startPage = Math.max(0, endPage - maxPageButtons + 1);
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers(page, totalPages);

    if (getProLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
            <article className="sortCat">
                <div className="flexcol g5">
                    <h1 className="heading">Top Rated Products</h1>
                    {!getProLoading && !getProError && numberOfElements && totalItems && <p className="text">Showing {numberOfElements} of {totalItems} products</p>}
                </div>
                <select name="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="RATING_LOW_TO_HIGH">Rating Low to High</option>
                    <option value="RATING_HIGH_TO_LOW">Rating High to Low</option>
                    <option value="A_TO_Z">Alphabetically A to Z</option>
                    <option value="Z_TO_A">Alphabetically Z to A</option>
                </select>
            </article>

            {getProError && <p className="text">Error loading products...</p>}
            <div className="adminGrid">
                {!getProLoading && !getProError && products && products.length > 0 ? (products.map((pro, index) => (
                    <Fragment key={index}>
                        <ProductCard name={pro.name} deleteIcon={deleteIcon} id={pro.productId} images={pro.image} ratings={pro.finalStar} originalPrice={pro.originalPrice} salePrice={pro.salePrice} />
                    </Fragment>
                ))) : (<p className="text">No products found!</p>)}
            </div>

            <div className="flex center wh">
                {!getProLoading && !getProError && totalItems > size && (
                    <div className="pagination" style={{ marginTop: '50px' }}>
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(0)} disabled={isFirst}>
                                First Page
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPrevious}>
                                Previous
                            </button>
                        </div>
                        <div className="flex wh" style={{ gap: '10px' }}>
                            {pageNumbers.map(index => (
                                <button key={index} className={`pagination-btn ${index === page ? 'active' : ''}`} onClick={() => handlePageChange(index)}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNext}>
                                Next
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(totalPages - 1)} disabled={isLast}>
                                Last Page
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default TopRated