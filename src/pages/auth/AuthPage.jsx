import React, { useEffect, useState, useRef, Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, setSignupData, signupUser, loginUser } from "../../slices/authSlice";
import { showToast } from "../../assets/Schemas";
import DOMPurify from 'dompurify';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';


const AuthPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { signLoading, signErrors, signError, logLoading, logErrors, logError } = useSelector((state) => state.auth);
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const containerRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const initialFormData = {
        email: '',
        role: '',
        password: '',
        confirmPassword: ''
    };
    const [formData, setFormData] = useState(initialFormData);

    //password hide and show
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [conPasswordVisible, setConPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleConPasswordVisibility = () => {
        setConPasswordVisible(!conPasswordVisible);
    };

    //toggle signin/signup
    const handleSignUpClick = () => {
        setIsSignUpMode(true);
        setFormData(initialFormData);
        dispatch(clearErrors());
    };
    const handleSignInClick = () => {
        setIsSignUpMode(false);
        setFormData(initialFormData);
        dispatch(clearErrors());
    };

    //form signup
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        dispatch(clearErrors());
    };

    const getSignError = (field) => Array.isArray(signErrors) ? signErrors.find(error => error.path === field) : null;
    const emailError = getSignError('email');
    const passwordError = getSignError('password');
    const confirmPasswordError = getSignError('confirmPassword');

    const getLogError = (field) => Array.isArray(logErrors) ? logErrors.find(error => error.path === field) : null;
    const emailLogError = getLogError('email');
    const roleError = getLogError('role');
    const passwordLogError = getLogError('password');

    const handleSignup = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (emailError || passwordError || confirmPasswordError) {
            showToast('error', 'Please fix the errors before submitting the form!');
            return;
        }
        setIsSubmitting(true);

        try {
            const userData = {
                email: DOMPurify.sanitize(formData.email),
                role: 'User',
                password: DOMPurify.sanitize(formData.password),
                confirmPassword: DOMPurify.sanitize(formData.confirmPassword)
            };

            const response = await dispatch(signupUser(userData)).unwrap();
            if (response.status === "success") {
                dispatch(setSignupData({
                    email: userData.email,
                    role: userData.role,
                    password: userData.password,
                    confirmPassword: userData.confirmPassword
                }));
                showToast('success', `${response.message}`);
                navigate('/verify-otp');
            }

        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (emailLogError || roleError || passwordLogError) {
            showToast('error', 'Please fix the errors before submitting the form!');
            return;
        }
        setIsSubmitting(true);

        try {
            const userData = {
                email: DOMPurify.sanitize(formData.email),
                role: DOMPurify.sanitize(formData.role),
                password: DOMPurify.sanitize(formData.password)
            };
            const response = await dispatch(loginUser(userData)).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
                navigate('/');
            }

        } catch (error) {
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
                <title>Buying - Register Page</title>
                <meta name="description" content="Create an account on Buying to explore exclusive deals, shop your favorite products, and enjoy a seamless shopping experience. Register today and start your journey with us!" />
                <link rel="canonical" href="https://buying.netlify.app/register" />
            </Helmet>
            <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`} ref={containerRef}>
                <div className="forms-container">
                    <div className="signin-signup">

                        <form className="authForm sign-in-form" onSubmit={handleLogin}>
                            <div className="formCont">
                                <h2 className="headingBig">Login</h2>

                                <div className="flexcol start-center w100 g5">
                                    <input type="email" name='email' autoComplete='email' placeholder='Enter your email...' value={formData.email} onChange={handleChange} />
                                    {emailLogError && <p className="error">{emailLogError.msg}</p>}
                                </div>

                                <div className="flexcol start-center w100 g5">
                                    <select name="role" id="role" value={formData.role} onChange={handleChange}>
                                        <option value="">Select Role</option>
                                        <option value="User">User</option>
                                        <option value="Manager">Manager</option>
                                    </select>
                                    {roleError && <p className="error">{roleError.msg}</p>}
                                </div>

                                <div className="flexcol start-center w100 g5">
                                    <div className="password">
                                        <input type={passwordVisible ? "text" : "password"} name='password' autoComplete="current-password" placeholder='Enter your password...' value={formData.password} onChange={handleChange} />
                                        <span onClick={togglePasswordVisibility}>
                                            {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </span>
                                    </div>
                                    {passwordLogError && <p className="error">{passwordLogError.msg}</p>}
                                    {logError && <p className="error">{logError}</p>}
                                </div>

                                <Link to="/forgot-password" className="w100 flex center-end textSmol">Forgot your password?</Link>
                                <button type="submit" disabled={isSubmitting || logLoading}>{(isSubmitting || logLoading) ? 'Loging...' : 'Login'}</button>
                                <p className="text">Or Login with social platforms</p>
                                <div className="social-media">
                                    <GoogleIcon />
                                    <FacebookIcon />
                                    <GitHubIcon />
                                </div>
                            </div>
                        </form>

                        <form className="authForm sign-up-form" onSubmit={handleSignup}>
                            <div className="formCont">
                                <h2 className="headingBig">Sign up</h2>

                                <div className="flexcol start-center w100 g5">
                                    <input type="email" name='email' autoComplete='email' placeholder='Enter your email...' value={formData.email} onChange={handleChange} />
                                    {emailError && <p className="error">{emailError.msg}</p>}
                                </div>

                                <div className="flexcol start-center w100 g5">
                                    <div className="password">
                                        <input type={passwordVisible ? "text" : "password"} name='password' autoComplete="new-password" placeholder='Enter your password...' value={formData.password} onChange={handleChange} />
                                        <span onClick={togglePasswordVisibility}>
                                            {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </span>
                                    </div>
                                    {passwordError && <p className="error">{passwordError.msg}</p>}
                                </div>

                                <div className="flexcol start-center w100 g5">
                                    <div className="password">
                                        <input type={conPasswordVisible ? "text" : "password"} name="confirmPassword" autoComplete="confirm-password" placeholder='Enter your password again...' value={formData.confirmPassword} onChange={handleChange} />
                                        <span onClick={toggleConPasswordVisibility}>
                                            {conPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </span>
                                    </div>
                                    {confirmPasswordError && <p className="error">{confirmPasswordError.msg}</p>}
                                    {signError && <p className="error">{signError}</p>}
                                </div>

                                <button type="submit" disabled={isSubmitting || signLoading}>{(isSubmitting || signLoading) ? 'Signing...' : 'Signup'}</button>
                                <p className="text">Or Sign up with social platforms</p>
                                <div className="social-media">
                                    <GoogleIcon />
                                    <FacebookIcon />
                                    <GitHubIcon />
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3 className="headingBig">New here?</h3>
                            <p className="textBig">
                                Join Buying today and explore the best deals on your favorite merchandise. Shop with ease and style!
                            </p>
                            <button className="btn" onClick={handleSignUpClick}>Sign up</button>
                        </div>
                        <img src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" className="image" alt="login" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3 className="headingBig">One of us?</h3>
                            <p className="textBig">
                                Welcome back to Buying! Log in to track orders, browse new arrivals, and enjoy exclusive member benefits.
                            </p>
                            <button className="btn" onClick={handleSignInClick}>Login</button>
                        </div>
                        <img src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png" className="image" alt="signup" />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AuthPage;
