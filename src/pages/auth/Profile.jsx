import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from "../../assets/Schemas";
import { updateProfile, addAddress, getAddress, editAddress, deleteAddress, clearErrors } from '../../slices/authSlice';
import DOMPurify from 'dompurify';
import Loader from '../../components/Loader';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';


const Profile = () => {

    const dispatch = useDispatch();
    const { user, profLoading, profErrors, profError, addresses, addLoading, addErrors, addError, editLoading, editErrors, editError, getLoading, getError, delLoading } = useSelector((state) => state.auth);
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isClickedFooterTwo, setIsClickedFooterTwo] = useState(false);
    const [isClickedFooterThree, setIsClickedFooterThree] = useState(false);
    const [isClickedFooterFour, setIsClickedFooterFour] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        dispatch(getAddress());
    }, [dispatch]);

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const initialState = {
        address: '',
        city: '',
        landmark: '',
        pincode: '',
        number: '',
        isDefault: false
    };
    const [addressValues, setAddressValues] = useState(initialState);

    useEffect(() => {
        if (user) {
            setFormValues({
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.email || ''
            });
        }
    }, [user]);

    const handleClickFooter = (event) => {
        event.preventDefault();
        setIsClickedFooter(true);
    };
    const handleClickFooterTwo = (event) => {
        event.preventDefault();
        setIsClickedFooterTwo(true);
    };
    const handleClickFooterThree = (event, item) => {
        event.preventDefault();
        setEditId(item._id);
        setAddressValues({
            address: item.address,
            city: item.city,
            landmark: item.landmark,
            pincode: item.pincode,
            number: item.number,
            isDefault: item.isDefault || false
        });
        setIsClickedFooterThree(true);
    };
    const handleClickFooterFour = (event, id) => {
        event.preventDefault();
        setDeleteId(id);
        setIsClickedFooterFour(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        dispatch(clearErrors());
    };
    const handleAddressChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAddressValues({
            ...addressValues, [name]: type === 'checkbox' ? checked : value,
        });
        dispatch(clearErrors());
    };
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
        setIsClickedFooterTwo(false);
        setIsClickedFooterThree(false);
        setIsClickedFooterFour(false)
    };

    const getProfError = (field) => Array.isArray(profErrors) ? profErrors.find(error => error.path === field) : null;
    const firstNameError = getProfError('firstName');
    const lastNameError = getProfError('lastName');

    const getAddError = (field) => Array.isArray(addErrors) ? addErrors.find(error => error.path === field) : null;
    const addressError = getAddError('address');
    const cityError = getAddError('city');
    const landmarkError = getAddError('landmark');
    const pincodeError = getAddError('pincode');
    const numberError = getAddError('number');

    const getEditAdError = (field) => Array.isArray(editErrors) ? editErrors.find(error => error.path === field) : null;
    const editAddressError = getEditAdError('address');
    const editCityError = getEditAdError('city');
    const editLandmarkError = getEditAdError('landmark');
    const editPincodeError = getEditAdError('pincode');
    const editNumberError = getEditAdError('number');

    const profileSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        if (firstNameError || lastNameError) {
            showToast('error', 'Please fix the errors before submitting the form!');
            return;
        }
        setIsSubmitted(true);
        try {
            const userData = {
                firstName: DOMPurify.sanitize(formValues.firstName),
                lastName: DOMPurify.sanitize(formValues.lastName)
            };
            const response = await dispatch(updateProfile(userData)).unwrap();
            if (response.status === "success") {
                showToast('success', `${response.message}`);
                setIsClickedFooter(false);
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsSubmitted(false);
        }
    };
    const addAddressSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        if (addressError || cityError || landmarkError || pincodeError || numberError) {
            showToast('error', 'Please fix the errors before submitting the form!');
            return;
        }
        setIsSubmitted(true);
        try {
            const userData = {
                address: DOMPurify.sanitize(addressValues.address),
                city: DOMPurify.sanitize(addressValues.city),
                landmark: DOMPurify.sanitize(addressValues.landmark),
                pincode: DOMPurify.sanitize(addressValues.pincode),
                number: DOMPurify.sanitize(addressValues.number),
                isDefault: addressValues.isDefault
            };
            const response = await dispatch(addAddress(userData)).unwrap();
            if (response.status === "success") {
                showToast('success', `${response.message}`);
                setAddressValues(initialState);
                setIsClickedFooterTwo(false);
            } else {
                showToast('error', `${response.message}`);
            }

        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsSubmitted(false);
        }
    };
    const deleteAddressHandle = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        setIsSubmitted(true);
        try {
            const response = await dispatch(deleteAddress(deleteId)).unwrap();
            if (response.status === "success") {
                showToast('success', `${response.message}`);
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setDeleteId(null);
            setIsSubmitted(false);
            setIsClickedFooterFour(false);
        }
    };
    const editAddressSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        if (editAddressError || editCityError || editLandmarkError || editPincodeError || editNumberError) {
            showToast('error', 'Please fix the errors before submitting the form!');
            return;
        }
        setIsSubmitted(true);
        try {
            const userData = {
                addressId: editId,
                address: DOMPurify.sanitize(addressValues.address),
                city: DOMPurify.sanitize(addressValues.city),
                landmark: DOMPurify.sanitize(addressValues.landmark),
                pincode: DOMPurify.sanitize(addressValues.pincode),
                number: DOMPurify.sanitize(addressValues.number),
                isDefault: addressValues.isDefault
            };
            const response = await dispatch(editAddress(userData)).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
                setAddressValues(initialState);
                setEditId(null);
                setIsClickedFooterThree(false);
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsSubmitted(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isClickedFooter || isClickedFooterTwo || isClickedFooterThree || isClickedFooterFour) {
                setIsClickedFooter(false);
                setIsClickedFooterTwo(false);
                setIsClickedFooterThree(false);
                setIsClickedFooterFour(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isClickedFooter, isClickedFooterTwo, isClickedFooterThree, isClickedFooterFour]);

    if (getLoading) {
        return <Loader />;
    }

    return (
        <Fragment>
            <Helmet>
                <title>Buying - Profile Page</title>
                <meta name="description" content="Manage your account settings, view your order history, and update your personal information on the Buying profile page. Access your saved addresses and preferences to enhance your shopping experience." />
                <link rel="canonical" href="https://buying.netlify.app/profile" />
            </Helmet>

            <div className="page flexcol center">
                <article className='w100 flex center-start'><h1 className='heading'>Profile</h1></article>

                <div className="profile">
                    <div className="flex verify center-start g5">
                        <p className="textBig fw-800">{user?.firstName || 'Unknown'} {user?.lastName || 'Unknown'}</p> <EditIcon style={{ cursor: 'pointer' }} onClick={(e) => handleClickFooter(e, user)} />
                    </div>
                    <div className="flexcol start-center">
                        <p className="text" style={{ color: 'var(--codeThree)' }}>Email</p>
                        <p className="text verify flex center-start g5" >{user?.email || 'example@gmail.com'}
                            {user?.isVerified === 1 ? <VerifiedIcon /> : <NewReleasesIcon style={{ color: 'orange' }} />}
                        </p>
                    </div>
                </div>

                <div className="profile">
                    <div className="flex verify center-start g5">
                        <p className="textBig fw-800">Addresses</p>
                        <AddLocationAltIcon style={{ cursor: 'pointer' }} onClick={handleClickFooterTwo} />
                    </div>
                    <div className="addresses">
                        {getError ? (<p className='text'>Error loading addresses!</p>) :
                            addresses && addresses.length > 0 ? addresses.map((item, index) => {
                                return (
                                    <div className="addressCard" key={item._id}>
                                        <div className="flex center-space w100">
                                            <p className="text" style={{ color: 'var(--codeThree)' }}>
                                                {item.isDefault ? `Default Address` : `Address ${index + 1}`}
                                            </p>
                                            <div className="addressIcons">
                                                <EditIcon onClick={(e) => handleClickFooterThree(e, item)} />
                                                <DeleteIcon onClick={(e) => handleClickFooterFour(e, item._id)} />
                                            </div>
                                        </div>
                                        <div className="addressDetails">
                                            <div className="addressRow">
                                                <div className="addressHeading">Address:</div>
                                                <p className="textSmol">{item.address}</p>
                                            </div>
                                            <div className="addressRow">
                                                <div className="addressHeading">City:</div>
                                                <p className="textSmol">{item.city}</p>
                                            </div>
                                            <div className="addressRow">
                                                <div className="addressHeading">Landmark:</div>
                                                <p className="textSmol">{item.landmark}</p>
                                            </div>
                                            <div className="addressRow">
                                                <div className="addressHeading">Pincode:</div>
                                                <p className="textSmol">{item.pincode}</p>
                                            </div>
                                            <div className="addressRow">
                                                <div className="addressHeading">Number:</div>
                                                <p className="textSmol">{item.number}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <p className='text'>No addresses found!</p>
                            )}
                    </div>
                </div>

                <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                    {isClickedFooter && (
                        <div className="popup">
                            <form className="popup-wrapper" onSubmit={profileSubmit}>
                                <h2 className="heading">Update Profile</h2>

                                <div className="popInputCont">
                                    <div className="flexcol start-center w100 g5">
                                        <input type="text" name='firstName' autoComplete="given-name" placeholder='Enter your first name...' value={formValues.firstName} onChange={handleInputChange} />
                                        {firstNameError && <p className="error">{firstNameError.msg}</p>}
                                    </div>
                                    <div className="flexcol start-center w100 g5">
                                        <input type="text" name='lastName' autoComplete="family-name" placeholder='Enter your last name...' value={formValues.lastName} onChange={handleInputChange} />
                                        {lastNameError && <p className="error">{lastNameError.msg}</p>}
                                    </div>
                                    <div className="flexcol start-center w100 g5">
                                        <input type="email" disabled name='email' className='disabled' autoComplete='email' placeholder='Enter your email...' value={formValues.email} onChange={handleInputChange} />
                                        <p className="error">Email used for login can't be changed</p>
                                        {profError && <p className="error">{profError}</p>}
                                    </div>
                                </div>

                                <div className="flex w100 g10" style={{ justifyContent: 'space-between' }}>
                                    <button type='submit' disabled={isSubmitted || profLoading}>{(isSubmitted || profLoading) ? 'Updating...' : 'Update'}</button>
                                    <button type="button" onClick={closepopup}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div className={`popup-btn ${isClickedFooterTwo ? 'clicked' : ''}`}>
                    {isClickedFooterTwo && (
                        <div className="popup">
                            <form className="popup-wrapper" onSubmit={addAddressSubmit}>
                                <h2 className="heading">Add Address</h2>

                                <div className="popInputCont">
                                    <div className="flexcol start-center w100 g5">
                                        <input type="text" name="address" autoComplete="street-address" placeholder="Enter your address..." value={addressValues.address} onChange={handleAddressChange} />
                                        {addressError && <p className="error">{addressError.msg}</p>}
                                    </div>
                                    <div className="flexcol start-center w100 g5">
                                        <input type="text" name="city" autoComplete="address-level2" placeholder="Enter your city..." value={addressValues.city} onChange={handleAddressChange} />
                                        {cityError && <p className="error">{cityError.msg}</p>}
                                    </div>
                                    <div className="flexcol start-center w100 g5">
                                        <input type="text" name="landmark" autoComplete="off" placeholder="Enter any landmark..." value={addressValues.landmark} onChange={handleAddressChange} />
                                        {landmarkError && <p className="error">{landmarkError.msg}</p>}
                                    </div>
                                    <div className="flexcol start-center w100 g5">
                                        <input type="text" name="pincode" autoComplete="postal-code" placeholder="Enter your pincode..." value={addressValues.pincode} onChange={handleAddressChange} />
                                        {pincodeError && <p className="error">{pincodeError.msg}</p>}
                                    </div>
                                    <div className="flexcol start-center w100 g5">
                                        <input type="text" name="number" autoComplete="tel" placeholder="Enter your number..." value={addressValues.number} onChange={handleAddressChange} />
                                        {numberError && <p className="error">{numberError.msg}</p>}
                                    </div>
                                    <div className="flex center-start w100 g5">
                                        <input type="checkbox" name='isDefault' checked={addressValues.isDefault} onChange={handleAddressChange} /> <div className="text">Make it default address</div>
                                    </div>
                                    {addError && <p className="error">{addError}</p>}
                                </div>

                                <div className="flex w100 g10" style={{ justifyContent: 'space-between' }}>
                                    <button type='submit' disabled={isSubmitted || addLoading}>{(isSubmitted || addLoading) ? 'Adding...' : 'Add'}</button>
                                    <button type="button" onClick={closepopup}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div className={`popup-btn ${isClickedFooterThree ? 'clicked' : ''}`}>
                    {isClickedFooterThree && (
                        <div className="popup">
                            <form className="popup-wrapper" onSubmit={editAddressSubmit}>
                                <h2 className="heading">Edit Address</h2>

                                <div className="popInputCont">
                                    <div className="flexcol start-center w100 g5">
                                        <input type="text" name="address" autoComplete="street-address" placeholder="Enter your address..." value={addressValues.address} onChange={handleAddressChange} />
                                        {editAddressError && <p className="error">{editAddressError.msg}</p>}
                                    </div>
                                    <div className="flexcol start-center w100 g5">
                                        <input type="text" name="city" autoComplete="address-level2" placeholder="Enter your city..." value={addressValues.city} onChange={handleAddressChange} />
                                        {editCityError && <p className="error">{editCityError.msg}</p>}
                                    </div>
                                    <div className="flexcol start-center w100 g5">
                                        <input type="text" name="landmark" autoComplete="off" placeholder="Enter any landmark..." value={addressValues.landmark} onChange={handleAddressChange} />
                                        {editLandmarkError && <p className="error">{editLandmarkError.msg}</p>}
                                    </div>
                                    <div className="flexcol start-center w100 g5">
                                        <input type="text" name="pincode" autoComplete="postal-code" placeholder="Enter your pincode..." value={addressValues.pincode} onChange={handleAddressChange} />
                                        {editPincodeError && <p className="error">{editPincodeError.msg}</p>}
                                    </div>
                                    <div className="flexcol start-center w100 g5">
                                        <input type="text" name="number" autoComplete="tel" placeholder="Enter your number..." value={addressValues.number} onChange={handleAddressChange} />
                                        {editNumberError && <p className="error">{editNumberError.msg}</p>}
                                    </div>
                                    <div className="flex center-start w100 g5">
                                        <input type="checkbox" name='isDefault' checked={addressValues.isDefault} onChange={handleAddressChange} /> <div className="text">Make it default address</div>
                                    </div>
                                    {editError && <p className="error">{editError}</p>}
                                </div>

                                <div className="flex w100 g10" style={{ justifyContent: 'space-between' }}>
                                    <button type='submit' disabled={isSubmitted || editLoading}>{(isSubmitted || editLoading) ? 'Updating...' : 'Update'}</button>
                                    <button type="button" onClick={closepopup}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div className={`popup-btn ${isClickedFooterFour ? 'clicked' : ''}`}>
                    {isClickedFooterFour && (
                        <div className="popup">
                            <form className="popup-wrapper" onSubmit={deleteAddressHandle}>
                                <h2 className="headingSmol">Are you sure?</h2>

                                <div className="flex w100 g10" style={{ justifyContent: 'space-between' }}>
                                    <button type='submit' disabled={isSubmitted || delLoading}>{(isSubmitted || delLoading) ? 'Deleting...' : 'Yes'}</button>
                                    <button type="button" onClick={closepopup}>No</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default Profile