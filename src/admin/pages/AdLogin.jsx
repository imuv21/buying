import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { showToast } from "../../assets/Schemas";
import { clearErrors, loginUser } from "../../slices/authSlice";
import DOMPurify from 'dompurify';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const AdLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { logLoading, logErrors, logError } = useSelector((state) => state.auth);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    //password hide and show
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    //form login
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        dispatch(clearErrors());
    };

    const getLogError = (field) => Array.isArray(logErrors) ? logErrors.find(error => error.path === field) : null;
    const emailLogError = getLogError('email');
    const roleError = getLogError('role');
    const passwordLogError = getLogError('password');

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
                navigate('/dashboard/add-new-product');
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
                <title>Buying - Admin Login Page</title>
                <meta name="description" content="Securely log in to the Buying admin panel to manage products, orders, and users. Access powerful tools for monitoring sales, updating inventory, and overseeing customer interactions to ensure a smooth e-commerce experience." />
                <link rel="canonical" href="https://buying.netlify.app/admin/login" />
            </Helmet>

            <div className='page flexcol center' style={{ height: '100vh' }}>
                <form className="authBox" onSubmit={handleLogin}>
                    <h1 className="headingBig">Admin Login</h1>
                    <p className="textBig">Login to your account.</p>

                    <div className='flexcol center g10 w100'>
                        <div className="flexcol start-center w100 g5">
                            <input type="email" name='email' autoComplete='email' placeholder='Enter your email...' value={formData.email} onChange={handleChange} />
                            {emailLogError && <p className="error">{emailLogError.msg}</p>}
                        </div>
                        <div className="flexcol start-center w100 g5">
                            <select name="role" id="role" value={formData.role} onChange={handleChange}>
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
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
                    </div>

                    <button type="submit" style={{ borderRadius: 'var(--brTwo)' }} disabled={isSubmitting || logLoading}>{(isSubmitting || logLoading) ? 'Loging...' : 'Login'}</button>
                </form>
            </div>
        </Fragment>
    )
}

export default AdLogin