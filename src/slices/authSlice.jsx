import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/user/signup`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
        }
    }
);

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/user/verify-otp`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
            }
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/user/login`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/user/forgot-password`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
        }
    }
);

export const verifyPassword = createAsyncThunk(
    'auth/verifyPassword',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/user/verify-password-otp`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
        }
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.patch(`${BASE_URL}/api/v1/user/update-profile`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
        }
    }
);


export const addAddress = createAsyncThunk(
    'auth/addAddress',
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/api/v1/user/add-address`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
        }
    }
);

export const editAddress = createAsyncThunk(
    'auth/editAddress',
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.patch(`${BASE_URL}/api/v1/user/edit-address`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
        }
    }
);

export const getAddress = createAsyncThunk(
    'auth/getAddress',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/api/v1/user/get-address`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
            }
        }
    }
);

export const deleteAddress = createAsyncThunk(
    'auth/deleteAddress',
    async (addressId, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.delete(`${BASE_URL}/api/v1/user/delete-address/${addressId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
            }
        }
    }
);


export const getUserOrders = createAsyncThunk(
    'auth/getUserOrders',
    async ({ page, size, status, sortBy, order }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/api/v1/user/get-user-orders`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                params: { page, size, status, sortBy, order }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
            }
        }
    }
);

export const getOrderDetails = createAsyncThunk(
    'auth/getOrderDetails',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/user/get-order-details/${orderId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
            }
        }
    }
);

export const addReview = createAsyncThunk(
    'auth/addReview',
    async (reviewData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/api/v1/user/add-review`, reviewData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
        }
    }
);

export const paymentCod = createAsyncThunk(
    'auth/paymentCod',
    async ({ addressId, paymentMethod }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/api/v1/user/place-order`, { addressId, paymentMethod }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
            }
        }
    }
);

export const cancelOrder = createAsyncThunk(
    'auth/cancelOrder',
    async (orderId, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.put(`${BASE_URL}/api/v1/user/cancel-order/${orderId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
            }
        }
    }
);


const initialState = {

    user: null,
    token: null,
    logLoading: false,
    logErrors: null,
    logError: null,

    signupData: null,
    signLoading: false,
    signErrors: null,
    signError: null,

    otpLoading: false,
    otpError: null,

    emailData: null,
    fopaLoading: false,
    fopaErrors: null,
    fopaError: null,

    vepaLoading: false,
    vepaErrors: null,
    vepaError: null,

    profLoading: false,
    profErrors: null,
    profError: null,

    addresses: [],
    addLoading: false,
    addErrors: null,
    addError: null,

    editLoading: false,
    editErrors: null,
    editError: null,

    getLoading: false,
    getError: null,

    delLoading: false,
    delError: null,

    orderLoading: false,
    orderError: null,
    orders: [],
    totalOrders: 0,
    totalOrderPages: 0,
    pageOrders: 0,
    isFirstOrd: false,
    isLastOrd: false,
    hasNextOrd: false,
    hasPreviousOrd: false,

    orderDetails: null,
    orderDetailsLoading: false,
    orderDetailsError: null,

    addRevLoading: false,
    addRevErrors: null,
    addRevError: null,

    paymentLoading: false,
    paymentError: null,

    cancelOrderLoading: false,
    cancelOrderError: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.signErrors = null;
            state.signError = null;
            state.logErrors = null;
            state.logError = null;
            state.otpError = null;
            state.fopaErrors = null;
            state.fopaError = null;
            state.vepaErrors = null;
            state.vepaError = null;
            state.profErrors = null;
            state.profError = null;
            state.addErrors = null;
            state.addError = null;
            state.editErrors = null;
            state.editError = null;
            state.getError = null;
            state.delError = null;
            state.addRevErrors = null;
            state.addRevError = null;
        },
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
        setEmailData: (state, action) => {
            state.emailData = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.signLoading = true;
                state.signErrors = null;
                state.signError = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.signLoading = false;
                state.signErrors = null;
                state.signError = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.signLoading = false;
                if (Array.isArray(action.payload)) {
                    state.signErrors = action.payload;
                } else {
                    state.signError = action.payload?.message || "Something went wrong!";
                }
            })

            .addCase(verifyOtp.pending, (state) => {
                state.otpLoading = true;
                state.otpError = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.otpLoading = false;
                state.otpError = null;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.otpLoading = false;
                state.otpError = action.payload?.message || "Something went wrong!";
            })

            .addCase(loginUser.pending, (state) => {
                state.logLoading = true;
                state.logErrors = null;
                state.logError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.logLoading = false;
                state.logErrors = null;
                state.logError = null;
                state.user = action.payload?.user || null;
                state.token = action.payload?.token || null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.logLoading = false;
                if (Array.isArray(action.payload)) {
                    state.logErrors = action.payload;
                } else {
                    state.logError = action.payload?.message || "Something went wrong!";
                }
            })

            .addCase(forgotPassword.pending, (state) => {
                state.fopaLoading = true;
                state.fopaErrors = null;
                state.fopaError = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.fopaLoading = false;
                state.fopaErrors = null;
                state.fopaError = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.fopaLoading = false;
                if (Array.isArray(action.payload)) {
                    state.fopaErrors = action.payload;
                } else {
                    state.fopaError = action.payload?.message || "Something went wrong!";
                }
            })

            .addCase(verifyPassword.pending, (state) => {
                state.vepaLoading = true;
                state.vepaErrors = null;
                state.vepaError = null;
            })
            .addCase(verifyPassword.fulfilled, (state) => {
                state.vepaLoading = false;
                state.vepaErrors = null;
                state.vepaError = null;
            })
            .addCase(verifyPassword.rejected, (state, action) => {
                state.vepaLoading = false;
                if (Array.isArray(action.payload)) {
                    state.vepaErrors = action.payload;
                } else {
                    state.vepaError = action.payload?.message || "Something went wrong!";
                }
            })

            .addCase(updateProfile.pending, (state) => {
                state.profLoading = true;
                state.profErrors = null;
                state.profError = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profLoading = false;
                state.profErrors = null;
                state.profError = null;
                state.user = {
                    ...state.user,
                    firstName: action.payload?.profile?.firstName,
                    lastName: action.payload?.profile?.lastName,
                };
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.profLoading = false;
                if (Array.isArray(action.payload)) {
                    state.profErrors = action.payload;
                } else {
                    state.profError = action.payload?.message || "Something went wrong!";
                }
            })

            .addCase(addAddress.pending, (state) => {
                state.addLoading = true;
                state.addErrors = null;
                state.addError = null;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.addLoading = false;
                state.addErrors = null;
                state.addError = null;
                state.addresses = action.payload?.addresses || [];
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.addLoading = false;
                if (Array.isArray(action.payload)) {
                    state.addErrors = action.payload;
                } else {
                    state.addError = action.payload?.message || "Something went wrong!";
                }
            })

            .addCase(editAddress.pending, (state) => {
                state.editLoading = true;
                state.editErrors = null;
                state.editError = null;
            })
            .addCase(editAddress.fulfilled, (state, action) => {
                state.editLoading = false;
                state.editErrors = null;
                state.editError = null;
                state.addresses = action.payload?.addresses || [];
            })
            .addCase(editAddress.rejected, (state, action) => {
                state.editLoading = false;
                if (Array.isArray(action.payload)) {
                    state.editErrors = action.payload;
                } else {
                    state.editError = action.payload?.message || "Something went wrong!";
                }
            })

            .addCase(getAddress.pending, (state) => {
                state.getLoading = true;
                state.getError = null;
            })
            .addCase(getAddress.fulfilled, (state, action) => {
                state.getLoading = false;
                state.getError = null;
                state.addresses = action.payload?.addresses || [];
            })
            .addCase(getAddress.rejected, (state, action) => {
                state.getLoading = false;
                state.getError = action.payload?.message || "Something went wrong!";
            })

            .addCase(deleteAddress.pending, (state) => {
                state.delLoading = true;
                state.delError = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.delLoading = false;
                state.delError = null;
                state.addresses = action.payload?.addresses || [];
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.delLoading = false;
                state.delError = action.payload?.message || "Something went wrong!";
            })

            .addCase(getUserOrders.pending, (state) => {
                state.orderLoading = true;
                state.orderError = null;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.orderLoading = false;
                state.orderError = null;

                state.orders = action.payload?.orders || [];
                state.totalOrders = action.payload?.totalOrders || 0;
                state.totalOrderPages = action.payload?.totalPages || 0;
                state.pageOrders = action.payload?.pageOrders || 0;

                state.isFirstOrd = action.payload?.isFirst || false;
                state.isLastOrd = action.payload?.isLast || false;
                state.hasNextOrd = action.payload?.hasNext || false;
                state.hasPreviousOrd = action.payload?.hasPrevious || false;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.orderLoading = false;
                state.orderError = action.payload?.message || "Something went wrong!";
            })

            .addCase(getOrderDetails.pending, (state) => {
                state.orderDetailsLoading = true;
                state.orderDetailsError = null;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.orderDetailsLoading = false;
                state.orderDetailsError = null;
                state.orderDetails = action.payload?.orderDetails || null;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.orderDetailsLoading = false;
                state.orderDetailsError = action.payload?.message || "Something went wrong!";
            })

            .addCase(addReview.pending, (state) => {
                state.addRevLoading = true;
                state.addRevErrors = null;
                state.addRevError = null;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.addRevLoading = false;
                state.addRevErrors = null;
                state.addRevError = null;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.addRevLoading = false;
                if (Array.isArray(action.payload)) {
                    state.addRevErrors = action.payload;
                } else {
                    state.addRevError = action.payload?.message || "Something went wrong!";
                }
            })

            .addCase(paymentCod.pending, (state) => {
                state.paymentLoading = true;
                state.paymentError = null;
            })
            .addCase(paymentCod.fulfilled, (state) => {
                state.paymentLoading = false;
                state.paymentError = null;
            })
            .addCase(paymentCod.rejected, (state, action) => {
                state.paymentLoading = false;
                state.paymentError = action.payload?.message || "Something went wrong!";
            })

            .addCase(cancelOrder.pending, (state) => {
                state.cancelOrderLoading = true;
                state.cancelOrderError = null;
            })
            .addCase(cancelOrder.fulfilled, (state) => {
                state.cancelOrderLoading = false;
                state.cancelOrderError = null;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.cancelOrderLoading = false;
                state.cancelOrderError = action.payload?.message || "Something went wrong!";
            });
    },
});


export const { clearErrors, setSignupData, setEmailData, logout } = authSlice.actions;
export default authSlice.reducer;