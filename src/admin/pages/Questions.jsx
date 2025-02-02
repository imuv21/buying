import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { questsAdmin } from '../../assets/schemas';
import DOMPurify from 'dompurify';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const Questions = () => {

    const navigate = useNavigate();
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        answer: ''
    });

    const handleClickFooter = (event) => {
        event.preventDefault();
        setIsClickedFooter(true);
    };
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
    };

    const back = () => {
        navigate('/dashboard/user-list');
    }
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
            const userData = {
                answer: DOMPurify.sanitize(formValues.answer),
            };
            'const response = await dispatch(updateProfile(userData)).unwrap();'
            if ('response.status' === "success") {
                toast(<div className='flex center g5'> < VerifiedIcon /> {`response.message`}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                setIsClickedFooter(false);
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> {`response.message`}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error updating profile!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsSubmitted(false);
        }
    };


    return (
        <Fragment>
            <article className="sortCat">
                <div className="backSection">
                    <ArrowBackIosNewIcon onClick={back} /> <h1 className="heading">Questions</h1>
                </div>
                <select name="sort">
                    <option value="atoz">Replied</option>
                    <option value="ztoa">No Reply</option>
                </select>
            </article>

            <article className='usersList'>
                <div className="userRowTwo">
                    <div className="index fw-600">index</div>
                    <div className="email fw-600">questions</div>
                    <div className="seeBtns fw-600">action</div>
                </div>

                {questsAdmin && questsAdmin.length > 0 && questsAdmin.map((question, index) => (
                    <div className="userRowTwo" key={index}>
                        <div className="index">{index + 1}</div>
                        <div className="email">
                            <div className="reviewAdCont">
                                <div className="reviewAd fw-600">
                                    {question.question}
                                </div>
                                <div className="reviewAd">{question.reply ? `${question.reply}` : `No reply yet!`}</div>
                            </div>
                        </div>
                        <div className="seeBtns"> <button onClick={handleClickFooter}>Reply</button> <button onClick={() => seeProduct(question.productId)}>View</button> <button>Delete</button> </div>
                    </div>
                ))}
            </article>

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        <form className="popup-wrapper" style={{gap: '10px'}} onSubmit={handleSubmit}>
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

export default Questions