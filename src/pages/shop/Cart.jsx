import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../assets/Schemas';
import { getAddress, paymentCod } from '../../slices/authSlice';
import { adjustCart, getCart, removeCart } from '../../slices/productSlice';

import axios from 'axios';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.jpg';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const BASE_URL = import.meta.env.VITE_BACKEND_URL;


const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, token, addresses, getLoading, getError } = useSelector((state) => state.auth);
    const { cart, totalQuantity, getCartLoading, getCartError, adjustCartError } = useSelector((state) => state.product);

    const baseAmount = cart.reduce((acc, item) => acc + (item.salePrice * item.quantity), 0);
    const shippingCharge = 60;
    const totalAmount = baseAmount + shippingCharge;

    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("online");
    const [quantities, setQuantities] = useState({});
    const [isRemoving, setIsRemoving] = useState({});
    const [paying, setPaying] = useState(false);

    useEffect(() => {
        dispatch(getCart());
        dispatch(getAddress());
    }, [dispatch]);

    useEffect(() => {
        const initialQuantities = {};
        cart.forEach((item, index) => {
            initialQuantities[index] = item.quantity;
        });
        setQuantities(initialQuantities);
    }, [cart]);

    useEffect(() => {
        const defaultAddress = addresses.find((address) => address.isDefault)?._id;
        if (defaultAddress) {
            setSelectedAddress(defaultAddress);
        }
    }, [addresses]);

    const handleAddressChange = (value) => {
        setSelectedAddress(value);
    }
    const handleMethodChange = (value) => {
        setSelectedMethod(value);
    }


    //quantity
    const updateCartQuantity = (cartItemId, actionObj) => {
        dispatch(adjustCart({ cartItemId, action: actionObj }));
    };
    const increase = (index, cartItemId, stocks) => {
        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[index] ?? 0;
            if (currentQuantity >= stocks) {
                showToast('error', 'Out of stock!');
                return prevQuantities;
            }
            if (currentQuantity >= 10) {
                showToast('error', "You can't add more than 10 products!");
                return prevQuantities;
            }
            const newQuantities = { ...prevQuantities, [index]: currentQuantity + 1 };
            updateCartQuantity(cartItemId, { action: "increase" });
            return newQuantities;
        });
    };
    const decrease = (index, cartItemId) => {
        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[index] ?? 1;
            const newQuantity = Math.max(1, currentQuantity - 1);
            const newQuantities = { ...prevQuantities, [index]: newQuantity };
            updateCartQuantity(cartItemId, { action: "decrease" });
            return newQuantities;
        });
    };
    const removeItem = async (index, productId, color, size) => {

        if (isRemoving[index]) return;
        setIsRemoving((prev) => ({ ...prev, [index]: true }));

        try {
            const cartData = { productId, color, size };
            const response = await dispatch(removeCart(cartData)).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsRemoving((prev) => ({ ...prev, [index]: false }));
        }
    };

    const shopping = () => {
        navigate('/category');
    }

    //payment
    const razorpayHandler = async (addressId, paymentMethod) => {

        if (paying) return;
        setPaying(true);

        const { data: { key } } = await axios.get(`${BASE_URL}/api/v1/user/get-key`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const { data: { payment } } = await axios.post(`${BASE_URL}/api/v1/user/place-order`, { addressId, paymentMethod },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const options = {
            key: key,
            amount: payment.amount,
            currency: payment.currency,
            name: `${user.firstName} ${user.lastName}`,
            description: "Test Transaction",
            image: logo,
            order_id: payment.id,
            callback_url: `${BASE_URL}/api/v1/user/payment-verification?&userId=${user._id}`,
            prefill: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email
            },
            notes: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email
            },
            theme: {
                color: "#0079c4"
            },
            modal: {
                escape: false,
                ondismiss: () => {
                    setPaying(false);
                    showToast('error', 'Something went wrong!');
                }
            }
        };

        const razor = new window.Razorpay(options);
        razor.open();
    };

    const payment = async (addressId, paymentMethod) => {
        if (paying) return;
        setPaying(true);
        try {
            const response = await dispatch(paymentCod({ addressId, paymentMethod })).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
                dispatch(getCart());
                navigate('/payment-success');
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setPaying(false);
        }
    }

    if (getCartLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
            <Helmet>
                <title>Buying - Your Cart</title>
                <meta name="description" content="Review and manage your cart items with ease on Buying. Adjust quantities, remove items, and prepare for a secure checkout for a seamless shopping experience." />
                <link rel="canonical" href="https://buying.netlify.app/cart" />
            </Helmet>

            <section className='page flexcol center'>
                <article className="flex center-start w100">
                    <h1 className="heading" style={{ textTransform: 'capitalize' }}>Shopping Cart ({totalQuantity} items)</h1>
                </article>
                <div className="cart-content">
                    <article className="cart-items">
                        {(getCartError || adjustCartError) ? (<p className='text'>Error loading cart!</p>) : cart && cart.length > 0 ? cart.map((item, index) => (
                            <div key={item._id} className="cart-item">
                                <div className="item-image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="item-details">
                                    <div className="summary-item">
                                        <h1 className='textBig'>{item.title}</h1>
                                        <p className='text'>{(item.salePrice * item.quantity).toFixed(2)}₹</p>
                                    </div>
                                    <div className="item-info">
                                        <p className='text'>Color: {item.color}</p>
                                        <p className='text'>Size: {item.size}</p>
                                    </div>
                                    <div className="summary-item">
                                        <div className="quantity-controls">
                                            <button className="quantity-btn" onClick={() => decrease(index, item._id)}><RemoveIcon /></button>
                                            <div className="quantity">{item.quantity}</div>
                                            <button className="quantity-btn" onClick={() => increase(index, item._id, item.stocks)}><AddIcon /></button>
                                        </div>
                                        <button className="remove-btn" onClick={() => removeItem(index, item.productId, item.color, item.size)} disabled={isRemoving[index]}>
                                            {isRemoving[index] ? 'Removing...' : 'Remove'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (<p className='text'>Your cart is empty!</p>)}
                    </article>

                    <article className="cart-summary">
                        <h1 className='headingSmol flex center w100'>Order Summary</h1>
                        <div className="summary-item">
                            <p className='text'>Total Items:</p>
                            <p className='text'>{totalQuantity}</p>
                        </div>
                        <div className="summary-item total">
                            <p className='text'>Subtotal:</p>
                            <p className='text'>{baseAmount.toFixed(2)}₹</p>
                        </div>
                        <div className="summary-item total">
                            <p className='text'>Shipping Charges:</p>
                            <p className='text'>{shippingCharge.toFixed(2)}₹</p>
                        </div>
                        <div className="summary-item total">
                            <p className='text fw-800'>Total Price:</p>
                            <p className='text fw-800'>{totalAmount.toFixed(2)}₹</p>
                        </div>
                        <div className="selectaddress">
                            <p className="text">{selectedAddress ? `Selected Address` : `Select Address`}</p>
                            <select name="address" value={selectedAddress} onChange={(e) => handleAddressChange(e.target.value)}>
                                <option value="">Select Address</option>
                                {getLoading ? (<option value="">Loading addresses...</option>
                                ) : getError ? (<option value="">Error loading addresses!</option>
                                ) : addresses && addresses.length > 0 ? (
                                    addresses.map((address) => (
                                        <option key={address._id} value={address._id}>
                                            {address.address}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No addresses found!</option>
                                )}
                            </select>
                            <p className="text">{selectedMethod ? `Selected Payment Method` : `Select Payment Method`}</p>
                            <select name="paymentMethod" value={selectedMethod} onChange={(e) => handleMethodChange(e.target.value)}>
                                <option value="online">Online</option>
                                <option value="cod">Cash On Delivery</option>
                            </select>
                        </div>
                        <button onClick={() => { selectedMethod === "online" ? razorpayHandler(selectedAddress, selectedMethod) : payment(selectedAddress, selectedMethod) }} disabled={totalQuantity === 0 || !selectedAddress || paying}>{paying ? 'Paying...' : 'Pay Now'}</button>
                        <button onClick={() => shopping()}>Continue Shopping</button>
                    </article>
                </div>
            </section>
        </Fragment>
    );
};

export default Cart;