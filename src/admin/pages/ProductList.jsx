import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchAdminProducts, deleteProduct } from '../../slices/adminProductSlice';
import Loader from '../../components/Loader/Loader';
import ProductCard from '../../components/ProductCard';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';


const ProductList = () => {

    const dispatch = useDispatch();
    const { products, totalItems, totalPages, numberOfElements, isFirst, isLast, hasNext, hasPrevious, getProLoading, getProError } = useSelector((state) => state.adminProduct);
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [sort, setSort] = useState("PRICE_LOW_TO_HIGH");
    const deleteIcon = true;

    useEffect(() => {
        dispatch(fetchAdminProducts({ page, size, sort }));
    }, [dispatch, page, size, sort]);

    const handleClickFooter = (productId) => {
        setSelectedProductId(productId);
        setIsClickedFooter(true);
    };
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
        setSelectedProductId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isDeleted) return;
        setIsDeleted(true);
        try {
            const response = await dispatch(deleteProduct(selectedProductId)).unwrap();
            if (response.status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                setSelectedProductId(null);
                dispatch(fetchAdminProducts({ page, size, sort }));
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            
            setIsDeleted(false);
            setIsClickedFooter(false);
        }
    };


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
                    <h1 className="heading">Products List</h1>
                    {!getProLoading && !getProError && numberOfElements && totalItems && <p className="text">Showing {numberOfElements} of {totalItems} products</p>}
                </div>
                <select name="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="PRICE_HIGH_TO_LOW">Price High to Low</option>
                    <option value="PRICE_LOW_TO_HIGH">Price Low to High</option>
                    <option value="A_TO_Z">Alphabetically A to Z</option>
                    <option value="Z_TO_A">Alphabetically Z to A</option>
                </select>
            </article>

            {getProError && <p className="text">Error loading products...</p>}
            <div className="adminGrid">
                {!getProLoading && !getProError && products && products.length > 0 ? (products.map((pro, index) => (
                    <Fragment key={index}>
                        <ProductCard name={pro.name} deleteIcon={deleteIcon} id={pro.productId} images={pro.image} ratings={pro.finalStar} originalPrice={pro.originalPrice} salePrice={pro.salePrice} onDelete={handleClickFooter} />
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


            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        <form className="popup-wrapper" style={{ gap: '10px' }} onSubmit={handleSubmit}>
                            <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Are you sure?</h2>

                            <div className="flex wh g10" style={{ marginTop: '15px', justifyContent: 'space-between' }}>
                                <button type='submit' className="applyBtn" disabled={isDeleted}>{isDeleted ? 'Deleting...' : 'Yes'}</button>
                                <button type="button" className="applyBtn" onClick={closepopup}>No</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default ProductList