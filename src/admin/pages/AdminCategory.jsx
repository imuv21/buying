import React, { Fragment, lazy, Suspense, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { categoryProducts } from '../../slices/categorySlice';
import Loader from '../../components/Loader/Loader';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ProductCard = lazy(() => import('../../components/ProductCard'));


const AdminCategory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, totalItems, totalPages, numberOfElements, isFirst, isLast, hasNext, hasPrevious, getProLoading, getProError } = useSelector((state) => state.category);
    const [categoryParams] = useSearchParams();
    const categoryName = categoryParams.get('query');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [sort, setSort] = useState("PRICE_LOW_TO_HIGH");


    useEffect(() => {
        dispatch(categoryProducts({ page, size, category: categoryName, sort }));
    }, [dispatch, page, size, categoryName, sort]);

    const back = () => {
        navigate('/dashboard/category-list');
    }

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


    return (
        <Fragment>
            <div className="sortCat">
                <div className="flexcol">
                    <div className="backSection">
                        <ArrowBackIosNewIcon onClick={back} />  <h1 className="heading">{categoryName}</h1>
                    </div>
                    <p className="text" style={{ marginLeft: '30px' }}>Showing {numberOfElements} of {totalItems} products</p>
                </div>

                <select name="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="PRICE_HIGH_TO_LOW">Price High to Low</option>
                    <option value="PRICE_LOW_TO_HIGH">Price Low to High</option>
                </select>
            </div>

            <div className="categoryGrid">
                {getProLoading && <p className="text">Loading products...</p>}
                {getProError && <p className="text">Error loading products...</p>}
                {!getProLoading && !getProError && products && products.length > 0 && products.map((pro) => (
                    <Fragment key={pro.productId}>
                        <Suspense fallback={<Loader />}>
                            <ProductCard name={pro.name} id={pro.productId} images={pro.image} originalPrice={pro.originalPrice} salePrice={pro.salePrice} />
                        </Suspense>
                    </Fragment>
                ))}
            </div>

            <div className="flex center wh">
                {!getProLoading && !getProError && totalItems > size && (
                    <div className="pagination">
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
    );
};

export default AdminCategory;