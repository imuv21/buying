import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { showToast } from "../../assets/Schemas";
import { clearErrors, setEmailData, verifyPassword } from "../../slices/authSlice";
import DOMPurify from 'dompurify';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const VerifyPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { vepaLoading, vepaErrors, vepaError, emailData } = useSelector((state) => state.auth);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        otp: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    //password hide and show
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [conPasswordVisible, setConPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleConPasswordVisibility = () => {
        setConPasswordVisible(!conPasswordVisible);
    };

    //form signup
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        dispatch(clearErrors());
    };

    const getVerifyError = (field) => Array.isArray(vepaErrors) ? vepaErrors.find(error => error.path === field) : null;
    const otpError = getVerifyError('otp');
    const newPasswordError = getVerifyError('newPassword');
    const confirmNewPasswordError = getVerifyError('confirmNewPassword');

    const handleForgot = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (otpError || newPasswordError || confirmNewPasswordError) {
            showToast('error', 'Please fix the errors before submitting the form!');
            return;
        }
        setIsSubmitting(true);
        try {
            const userRole = emailData?.role;
            const userData = {
                email: emailData?.email,
                role: userRole,
                otp: Number(formData.otp),
                newPassword: DOMPurify.sanitize(formData.newPassword),
                confirmNewPassword: DOMPurify.sanitize(formData.confirmNewPassword)
            };
            const response = await dispatch(verifyPassword(userData)).unwrap();

            if (response.status === "success") {

                dispatch(setEmailData(null));
                showToast('success', `${response.message}`);

                if (userRole === "Admin") {
                    navigate('/admin/login');
                } else {
                    navigate('/register');
                }
            }
        } catch (error) {
            console.log(error);
            showToast('error', 'Something went wrong!');
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        dispatch(clearErrors());
    }, [dispatch]);


    return (
        <Fragment>
            <Helmet>
                <title>Buying - New Password</title>
                <meta name="description" content="Reset your Buying account password by entering the OTP sent to your email and setting a new secure password." />
                <link rel="canonical" href="https://buying.netlify.app/new-password" />
            </Helmet>

            <div className='page flexcol center' style={{ height: '100vh' }}>
                <form className="authBox" onSubmit={handleForgot}>
                    <h1 className="headingBig">Create New Password</h1>
                    <p className="textBig">Enter your new password and the otp to reset your password.</p>

                    <div className='flexcol center g10 w100'>
                        <div className="flexcol start-center w100 g5">
                            <input type="text" name='otp' autoComplete="one-time-code" style={{ borderRadius: 'var(--brTwo)' }} placeholder='Enter the otp...' value={formData.otp} onChange={handleChange} />
                            {otpError && <p className="error">{otpError.msg}</p>}
                        </div>
                        <div className="flexcol start-center w100 g5">
                            <div className="password">
                                <input type={passwordVisible ? "text" : "password"} name='newPassword' autoComplete="new-password" style={{ borderRadius: 'var(--brTwo)' }} placeholder='Enter your password...' value={formData.newPassword} onChange={handleChange} />
                                <span onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </div>
                            {newPasswordError && <p className="error">{newPasswordError.msg}</p>}
                        </div>
                        <div className="flexcol start-center w100 g5">
                            <div className="password">
                                <input type={conPasswordVisible ? "text" : "password"} name="confirmNewPassword" autoComplete="confirm-password" style={{ borderRadius: 'var(--brTwo)' }} placeholder='Enter your password again...' value={formData.confirmNewPassword} onChange={handleChange} />
                                <span onClick={toggleConPasswordVisibility}>
                                    {conPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </div>
                            {confirmNewPasswordError && <p className="error">{confirmNewPasswordError.msg}</p>}
                            {vepaError && <p className="error">{vepaError}</p>}
                        </div>
                    </div>

                    <div className='flexcol center g10'>
                        <button type="submit" style={{ borderRadius: 'var(--brTwo)' }} disabled={isSubmitting || vepaLoading}>{(isSubmitting || vepaLoading) ? 'Saving...' : 'Save'}</button>
                        <Link to="/register" className='text'>Go Back</Link>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default VerifyPassword