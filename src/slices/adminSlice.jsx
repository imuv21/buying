import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const makeManager = createAsyncThunk(
    'admin/makeManager',
    async (userId, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.put(`${BASE_URL}/api/v1/admin/make-manager/${userId}`, {}, {
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

export const makeUser = createAsyncThunk(
    'admin/makeUser',
    async (userId, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.put(`${BASE_URL}/api/v1/admin/make-user/${userId}`, {}, {
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

export const addProduct = createAsyncThunk(
    'admin/addProduct',
    async (productData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/api/v1/admin/add-product`, productData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

export const editProduct = createAsyncThunk(
    'admin/editProduct',
    async ({ productId, productData }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.put(`${BASE_URL}/api/v1/admin/edit-product/${productId}`, productData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

export const deleteProduct = createAsyncThunk(
    'admin/deleteProduct',
    async (productId, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.delete(`${BASE_URL}/api/v1/admin/delete-product/${productId}`, {
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

export const addToFeatured = createAsyncThunk(
    'admin/addToFeatured',
    async (productId, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.put(`${BASE_URL}/api/v1/admin/add-to-featured/${productId}`, {}, {
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

export const getFeatured = createAsyncThunk(
    'admin/getFeatured',
    async ({ page, size, sortBy, order }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/user/get-featured`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { page, size, sortBy, order }
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

export const removeFromFeatured = createAsyncThunk(
    'admin/removeFromFeatured',
    async (productId, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.delete(`${BASE_URL}/api/v1/admin/remove-from-featured/${productId}`, {
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

export const getTags = createAsyncThunk(
    'admin/getTags',
    async (searchTerm, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/api/v1/admin/get-tags`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    search: searchTerm
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

export const getUsersByRole = createAsyncThunk(
    'admin/getUsersByRole',
    async ({ page, size, role, sortBy, order }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/api/v1/admin/get-users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                params: { page, size, role, sortBy, order }
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

export const getUsersBySearch = createAsyncThunk(
    'admin/getUsersBySearch',
    async ({ page, size, search, role, sortBy, order }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/api/v1/admin/get-users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                params: { page, size, search, role, sortBy, order }
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

export const getOrders = createAsyncThunk(
    'admin/getOrders',
    async ({ page, size, status, sortBy, order }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/api/v1/admin/get-orders`, {
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

export const updateOrderStatus = createAsyncThunk(
    'admin/updateOrderStatus',
    async ({ status, orderId }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.patch(`${BASE_URL}/api/v1/admin/update-order-status/${orderId}`, { status }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === "success") {
                return { status: response.data.status, newStatus: status, orderId, message: response.data.message };
            } else {
                return response.data;
            }
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
            }
        }
    }
);

export const getAllReviews = createAsyncThunk(
    'admin/getAllReviews',
    async ({ page, size, sortBy, order }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/api/v1/admin/get-all-reviews`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                params: { page, size, sortBy, order }
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

export const deleteReview = createAsyncThunk(
    'admin/deleteReview',
    async ({ productId, reviewId }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.delete(`${BASE_URL}/api/v1/admin/delete-review/${productId}/${reviewId}`, {
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

    makeManagerLoading: false,
    makeManagerError: null,

    makeUserLoading: false,
    makeUserError: null,

    products: [],
    addLoading: false,
    addErrors: null,
    addError: null,

    editLoading: false,
    editErrors: null,
    editError: null,

    delLoading: false,
    delError: null,

    addFeatLoading: false,
    addFeatError: null,

    getFeatLoading: false,
    getFeatError: null,
    featProducts: [],
    totalFeatProducts: 0,
    totalFeatPages: 0,
    featPageProducts: 0,
    isFirstFeat: false,
    isLastFeat: false,
    hasNextFeat: false,
    hasPreviousFeat: false,

    remFeatLoading: false,
    remFeatError: null,

    tags: [],
    tagLoading: false,
    tagError: null,

    getRolLoading: false,
    getRolError: null,
    rolUsers: [],
    totalRolUsers: 0,
    totalRolPages: 0,
    rolPageUsers: 0,
    isFirstRol: false,
    isLastRol: false,
    hasNextRol: false,
    hasPreviousRol: false,

    getSchLoading: false,
    getSchError: null,
    schUsers: [],
    totalSchUsers: 0,
    totalSchPages: 0,
    schPageUsers: 0,
    isFirstSch: false,
    isLastSch: false,
    hasNextSch: false,
    hasPreviousSch: false,

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

    statusLoading: false,
    statusError: null,

    reviewLoading: false,
    reviewError: null,
    reviews: [],
    totalReviews: 0,
    totalReviewPages: 0,
    pageReviews: 0,
    isFirstRev: false,
    isLastRev: false,
    hasNextRev: false,
    hasPreviousRev: false,

    delRevLoading: false,
    delRevError: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.addErrors = null;
            state.addError = null;
            state.editErrors = null;
            state.editError = null;
            state.tagError = null;
            state.catError = null;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(makeManager.pending, (state) => {
                state.makeManagerLoading = true;
                state.makeManagerError = null;
            })
            .addCase(makeManager.fulfilled, (state) => {
                state.makeManagerLoading = false;
                state.makeManagerError = null;
            })
            .addCase(makeManager.rejected, (state, action) => {
                state.makeManagerLoading = false;
                state.makeManagerError = action.payload?.message || "Something went wrong!";
            })

            .addCase(makeUser.pending, (state) => {
                state.makeUserLoading = true;
                state.makeUserError = null;
            })
            .addCase(makeUser.fulfilled, (state) => {
                state.makeUserLoading = false;
                state.makeUserError = null;
            })
            .addCase(makeUser.rejected, (state, action) => {
                state.makeUserLoading = false;
                state.makeUserError = action.payload?.message || "Something went wrong!";
            })

            .addCase(addProduct.pending, (state) => {
                state.addLoading = true;
                state.addErrors = null;
                state.addError = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.addLoading = false;
                state.addErrors = null;
                state.addError = null;
                state.products = action.payload?.products || [];
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.addLoading = false;
                if (Array.isArray(action.payload)) {
                    state.addErrors = action.payload;
                } else {
                    state.addError = action.payload?.message || "Something went wrong!";
                }
            })

            .addCase(editProduct.pending, (state) => {
                state.editLoading = true;
                state.editErrors = null;
                state.editError = null;
            })
            .addCase(editProduct.fulfilled, (state) => {
                state.editLoading = false;
                state.editErrors = null;
                state.editError = null;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.editLoading = false;
                if (Array.isArray(action.payload)) {
                    state.editErrors = action.payload;
                } else {
                    state.editError = action.payload?.message || "Something went wrong!";
                }
            })

            .addCase(deleteProduct.pending, (state) => {
                state.delLoading = true;
                state.delError = null;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.delLoading = false;
                state.delError = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.delLoading = false;
                state.delError = action.payload?.message || "Something went wrong!";
            })

            .addCase(addToFeatured.pending, (state) => {
                state.addFeatLoading = true;
                state.addFeatError = null;
            })
            .addCase(addToFeatured.fulfilled, (state) => {
                state.addFeatLoading = false;
                state.addFeatError = null;
            })
            .addCase(addToFeatured.rejected, (state, action) => {
                state.addFeatLoading = false;
                state.addFeatError = action.payload?.message || "Something went wrong!";
            })

            .addCase(getFeatured.pending, (state) => {
                state.getFeatLoading = true;
                state.getFeatError = null;
            })
            .addCase(getFeatured.fulfilled, (state, action) => {
                state.getFeatLoading = false;
                state.getFeatError = null;

                state.featProducts = action.payload?.products || [];
                state.totalFeatProducts = action.payload?.totalProducts || 0;
                state.totalFeatPages = action.payload?.totalPages || 0;
                state.featPageProducts = action.payload?.pageProducts || 0;

                state.isFirstFeat = action.payload?.isFirst || false;
                state.isLastFeat = action.payload?.isLast || false;
                state.hasNextFeat = action.payload?.hasNext || false;
                state.hasPreviousFeat = action.payload?.hasPrevious || false;
            })
            .addCase(getFeatured.rejected, (state, action) => {
                state.getFeatLoading = false;
                state.getFeatError = action.payload?.message || "Something went wrong!";
            })

            .addCase(removeFromFeatured.pending, (state) => {
                state.remFeatLoading = true;
                state.remFeatError = null;
            })
            .addCase(removeFromFeatured.fulfilled, (state) => {
                state.remFeatLoading = false;
                state.remFeatError = null;
            })
            .addCase(removeFromFeatured.rejected, (state, action) => {
                state.remFeatLoading = false;
                state.remFeatError = action.payload?.message || "Something went wrong!";
            })

            .addCase(getTags.pending, (state) => {
                state.tagLoading = true;
                state.tagError = null;
            })
            .addCase(getTags.fulfilled, (state, action) => {
                state.tagLoading = false;
                state.tagError = null;
                state.tags = action.payload?.tags || [];
            })
            .addCase(getTags.rejected, (state, action) => {
                state.tagLoading = false;
                state.tagError = action.payload?.message || "Something went wrong!";
            })

            .addCase(getUsersByRole.pending, (state) => {
                state.getRolLoading = true;
                state.getRolError = null;
            })
            .addCase(getUsersByRole.fulfilled, (state, action) => {
                state.getRolLoading = false;
                state.getRolError = null;

                state.rolUsers = action.payload?.users || [];
                state.totalRolUsers = action.payload?.totalUsers || 0;
                state.totalRolPages = action.payload?.totalPages || 0;
                state.rolPageUsers = action.payload?.pageUsers || 0;

                state.isFirstRol = action.payload?.isFirst || false;
                state.isLastRol = action.payload?.isLast || false;
                state.hasNextRol = action.payload?.hasNext || false;
                state.hasPreviousRol = action.payload?.hasPrevious || false;
            })
            .addCase(getUsersByRole.rejected, (state, action) => {
                state.getRolLoading = false;
                state.getRolError = action.payload?.message || "Something went wrong!";
            })

            .addCase(getUsersBySearch.pending, (state) => {
                state.getSchLoading = true;
                state.getSchError = null;
            })
            .addCase(getUsersBySearch.fulfilled, (state, action) => {
                state.getSchLoading = false;
                state.getSchError = null;

                state.schUsers = action.payload?.users || [];
                state.totalSchUsers = action.payload?.totalUsers || 0;
                state.totalSchPages = action.payload?.totalPages || 0;
                state.schPageUsers = action.payload?.pageUsers || 0;

                state.isFirstSch = action.payload?.isFirst || false;
                state.isLastSch = action.payload?.isLast || false;
                state.hasNextSch = action.payload?.hasNext || false;
                state.hasPreviousSch = action.payload?.hasPrevious || false;
            })
            .addCase(getUsersBySearch.rejected, (state, action) => {
                state.getSchLoading = false;
                state.getSchError = action.payload?.message || "Something went wrong!";
            })

            .addCase(getOrders.pending, (state) => {
                state.orderLoading = true;
                state.orderError = null;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
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
            .addCase(getOrders.rejected, (state, action) => {
                state.orderLoading = false;
                state.orderError = action.payload?.message || "Something went wrong!";
            })

            .addCase(updateOrderStatus.pending, (state) => {
                state.statusLoading = true;
                state.statusError = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.statusLoading = false;
                state.statusError = null;
                state.orders = state.orders.map(order =>
                    order._id === action.payload.orderId ? { ...order, status: action.payload.newStatus } : order
                );
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.statusLoading = false;
                state.statusError = action.payload?.message || "Something went wrong!";
            })

            .addCase(getAllReviews.pending, (state) => {
                state.reviewLoading = true;
                state.reviewError = null;
            })
            .addCase(getAllReviews.fulfilled, (state, action) => {
                state.reviewLoading = false;
                state.reviewError = null;

                state.reviews = action.payload?.reviews || [];
                state.totalReviews = action.payload?.totalReviews || 0;
                state.totalReviewPages = action.payload?.totalPages || 0;
                state.pageReviews = action.payload?.pageReviews || 0;

                state.isFirstRev = action.payload?.isFirst || false;
                state.isLastRev = action.payload?.isLast || false;
                state.hasNextRev = action.payload?.hasNext || false;
                state.hasPreviousRev = action.payload?.hasPrevious || false;
            })
            .addCase(getAllReviews.rejected, (state, action) => {
                state.reviewLoading = false;
                state.reviewError = action.payload?.message || "Something went wrong!";
            })

            .addCase(deleteReview.pending, (state) => {
                state.delRevLoading = true;
                state.delRevError = null;
            })
            .addCase(deleteReview.fulfilled, (state) => {
                state.delRevLoading = false;
                state.delRevError = null;
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.delRevLoading = false;
                state.delRevError = action.payload?.message || "Something went wrong!";
            })
    },
});


export const { clearErrors } = adminSlice.actions;
export default adminSlice.reducer;