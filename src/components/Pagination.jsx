import React from 'react';
import { useSelector } from 'react-redux';

const Pagination = ({ page, setPage }) => {

    const { totalItems, totalPages, isFirst, isLast, hasNext, hasPrevious, getProLoading, getProError } = useSelector((state) => state.category);

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
        <div className="pagination">
            <div className="pagination-controls">
                <button className='pagination-btn' onClick={() => handlePageChange(0)} disabled={isFirst}>
                    First Page
                </button>
                <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPrevious}>
                    Previous
                </button>
            </div>

            <div className="pagination-numbers">
                {pageNumbers.map(index => (
                    <button key={index} className={`pagination-btn ${index === page ? 'active' : ''}`} onClick={() => handlePageChange(index)}>
                        {index + 1}
                    </button>
                ))}
            </div>

            <div className="pagination-controls">
                <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNext}>
                    Next
                </button>
                <button className='pagination-btn' onClick={() => handlePageChange(totalPages - 1)} disabled={isLast}>
                    Last Page
                </button>
            </div>
        </div>
    );
};

export default Pagination;



// const ContactUs = lazy(() => import('./pages/static/ContactUs'));
// const AboutUs = lazy(() => import('./pages/static/AboutUs'));
// const Privacy = lazy(() => import('./pages/static/Privacy'));
// const Refund = lazy(() => import('./pages/static/Refund'));
// const Term = lazy(() => import('./pages/static/Term'));

// <Route path='/contact-us' element={<Layout><ContactUs /></Layout>} />
// <Route path='/about-us' element={<Layout><AboutUs /></Layout>} />
// <Route path='/privacy-policy' element={<Layout><Privacy /></Layout>} />
// <Route path='/return-policy' element={<Layout><Refund /></Layout>} />
// <Route path='/terms-and-conditions' element={<Layout><Term /></Layout>} />