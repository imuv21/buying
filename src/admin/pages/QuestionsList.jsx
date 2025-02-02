import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getQuestion, deleteQuestion, replyQuestion } from '../../slices/userSlice';
import DOMPurify from 'dompurify';
import Loader from '../../components/Loader/Loader';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';



const QuestionsList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { questions, totalItems, totalPages, numberOfElements, isFirst, isLast, hasNext, hasPrevious, questLoading, questError } = useSelector((state) => state.user);
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState('NOT_REPLIED');
    const [size, setSize] = useState(20);
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isDeleted, setIsDeleted] = useState({});
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [formValues, setFormValues] = useState({
        answer: ''
    });

    useEffect(() => {
        dispatch(getQuestion({ page, status, size }));
    }, [dispatch, page, status, size]);

    const handleClickFooter = (questionId) => {
        setSelectedQuestionId(questionId);
        setIsClickedFooter(true);
    };
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
        setSelectedQuestionId(null);
    };
    const seeProduct = (id) => {
        navigate(`/dashboard/product-list/product-details/${id}`);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        setIsSubmitted(true);
        try {
            const sanitizedAnswer = DOMPurify.sanitize(formValues.answer);
            const response = await dispatch(replyQuestion({ id: selectedQuestionId, message: sanitizedAnswer })).unwrap();
            if (response.status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(getQuestion({ page, status, size }));
                setIsClickedFooter(false);
                setSelectedQuestionId(null);
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsSubmitted(false);
        }
    };

    const deleteQuestionHandle = async (id) => {

        if (isDeleted[id]) return;
        setIsDeleted((prevState) => ({ ...prevState, [id]: true }));
        try {
            const { status } = await dispatch(deleteQuestion(id)).unwrap();
            if (status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> Question deleted sucessfully!</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(getQuestion({ page, size }));
            }
        } catch (error) {
            console.log(error);
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error deleting question!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsDeleted((prevState) => ({ ...prevState, [id]: false }));
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

    return (
        <Fragment>
            <article className="sortCat">
                <div className="flexcol g5">
                    <h1 className="heading">Questions List</h1>
                    {!questLoading && !questError && numberOfElements && totalItems && <p className="text">Showing {numberOfElements} of {totalItems} questions</p>}
                </div>
                <select name="sort" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="REPLIED">Replied</option>
                    <option value="NOT_REPLIED">No Reply</option>
                </select>
            </article>

            <article className='usersList'>
                {questLoading ? (
                    <Loader />
                ) : questError ? (
                    <p>Error loading questions!</p>
                ) : (
                    <Fragment>
                        <div className="userRowTwo">
                            <div className="index fw-600">index</div>
                            <div className="email fw-600">questions</div>
                            <div className="seeBtns fw-600">action</div>
                        </div>

                        {questions && questions.length > 0 ? (questions.map((question, index) => (
                            <div className="userRowTwo" key={index}>
                                <div className="index">{index + 1}</div>
                                <div className="email">
                                    <div className="reviewAdCont">
                                        <div className="reviewAd fw-600">
                                            {question.question}
                                        </div>
                                        <div className="reviewAd">{question.answer ? `${question.answer}` : `No reply yet!`}</div>
                                    </div>
                                </div>
                                <div className="seeBtns">
                                    <button onClick={() => handleClickFooter(question.id)}>Reply</button>
                                    <button onClick={() => seeProduct(question.productId)}>View</button>
                                    <button onClick={() => deleteQuestionHandle(question.id)} disabled={isDeleted[question.id]}>{isDeleted[question.id] ? "Deleting..." : "Delete"}</button>
                                </div>
                            </div>
                        ))) : (<p className='text flex start wh' style={{ padding: '40px' }}>No questions found.</p>)}

                        {!questLoading && !questError && totalItems > size && (
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
                    </Fragment>
                )}
            </article>

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        <form className="popup-wrapper" style={{ gap: '10px' }} onSubmit={handleSubmit}>
                            <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Answer the question</h2>

                            <div className="pageBox5 flexcol center">
                                <input type="text" name="answer" placeholder="Enter the answer..." onChange={handleInputChange} required />
                            </div>

                            <div className="flex wh g10" style={{ marginTop: '15px', justifyContent: 'space-between' }}>
                                <button type='submit' className="applyBtn" disabled={isSubmitted}>{isSubmitted ? 'Submitting...' : 'Submit'}</button>
                                <button type="button" className="applyBtn" onClick={closepopup}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default QuestionsList