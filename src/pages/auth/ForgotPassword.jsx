import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { showToast } from "../../assets/Schemas";
import { clearErrors, forgotPassword, setEmailData } from "../../slices/authSlice";
import DOMPurify from 'dompurify';


const ForgotPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { fopaLoading, fopaErrors, fopaError } = useSelector((state) => state.auth);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        role: ''
    });

    //form signup
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        dispatch(clearErrors());
    };

    const getForgotError = (field) => Array.isArray(fopaErrors) ? fopaErrors.find(error => error.path === field) : null;
    const emailError = getForgotError('email');
    const roleError = getForgotError('role');

    const handleForgot = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (emailError || roleError) {
            showToast('error', 'Please fix the errors before submitting the form!');
            return;
        }
        setIsSubmitting(true);
        try {
            const userData = {
                email: DOMPurify.sanitize(formData.email),
                role: DOMPurify.sanitize(formData.role)
            };
            const response = await dispatch(forgotPassword(userData)).unwrap();

            if (response.status === "success") {
                dispatch(setEmailData({
                    email: userData.email,
                    role: userData.role
                }));
                showToast('success', `${response.message}`);
                navigate('/new-password');
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <Fragment>
            <Helmet>
                <title>Buying - Forgot Password</title>
                <meta name="description" content="Forgot your password? Enter your email address to receive a One-Time Password (OTP) and reset your account securely on Buying. Regain access to exclusive deals and a seamless shopping experience." />
                <link rel="canonical" href="https://buying.netlify.app/forgot-password" />
            </Helmet>

            <div className='page flexcol center' style={{ height: '100vh' }}>
                <form className="authBox" onSubmit={handleForgot}>
                    <h1 className="headingBig">Forgot Password?</h1>
                    <p className="textBig">Enter your email to get the otp.</p>

                    <div className='flexcol center g10 w100'>
                        <div className="flexcol start-center w100 g5">
                            <input type="email" name='email' autoComplete='email' style={{ borderRadius: 'var(--brTwo)' }} placeholder='Enter your email...' value={formData.email} onChange={handleChange} />
                            {emailError && <p className="error">{emailError.msg}</p>}
                        </div>
                        <div className="flexcol start-center w100 g5">
                            <select name="role" style={{ borderRadius: 'var(--brTwo)' }} value={formData.role} onChange={handleChange}>
                                <option value="">Select Role</option>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                            {roleError && <p className="error">{roleError.msg}</p>}
                            {fopaError && <p className="error">{fopaError}</p>}
                        </div>
                    </div>

                    <div className='flexcol center g10'>
                        <button type="submit" className="submitBtn" style={{ borderRadius: 'var(--brTwo)' }} disabled={isSubmitting || fopaLoading}>{(isSubmitting || fopaLoading) ? 'Sending...' : 'Send OTP'}</button>
                        <Link to="/register" className='text'>Go Back</Link>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default ForgotPassword