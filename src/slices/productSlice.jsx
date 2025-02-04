import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const getProductsByCategory = createAsyncThunk(
    'product/getProductsByCategory',
    async ({ page, size, category, sortBy, order }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/user/get-products`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { page, size, category, sortBy, order }
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

export const getProductsBySearch = createAsyncThunk(
    'product/getProductsBySearch',
    async ({ page, size, search, sortBy, order }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/user/get-products`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { page, size, search, sortBy, order }
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

export const getProductDetails = createAsyncThunk(
    'product/getProductDetails',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/user/get-product-details/${productId}`, {
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

export const getReviews = createAsyncThunk(
    'product/getReviews',
    async ({ page, size, sortBy, order, productId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/user/get-reviews/${productId}`, {
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


export const addCart = createAsyncThunk(
    'product/addCart',
    async (cartData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/api/v1/user/add-to-cart`, cartData, {
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

export const getCart = createAsyncThunk(
    'product/getCart',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/api/v1/user/get-cart`, {
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

export const adjustCart = createAsyncThunk(
    'product/adjustCart',
    async ({cartItemId, action}, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.put(`${BASE_URL}/api/v1/user/cart-quantity/${cartItemId}`, action, {
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

export const removeCart = createAsyncThunk(
    'product/removeCart',
    async (cartData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.delete(`${BASE_URL}/api/v1/user/remove-from-cart`, {
                data: cartData,
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

    getCatLoading: false,
    getCatError: null,
    catProducts: [],
    totalCatProducts: 0,
    totalCatPages: 0,
    catPageProducts: 0,
    isFirstCat: false,
    isLastCat: false,
    hasNextCat: false,
    hasPreviousCat: false,


    getSchLoading: false,
    getSchError: null,
    schProducts: [],
    totalSchProducts: 0,
    totalSchPages: 0,
    schPageProducts: 0,
    isFirstSch: false,
    isLastSch: false,
    hasNextSch: false,
    hasPreviousSch: false,


    productDetails: null,
    getDetailsLoading: false,
    getDetailsError: null,


    proRevLoading: false,
    proRevError: null,
    proReviews: [],
    totalProRev: 0,
    totalProRevPages: 0,
    pageProRev: 0,
    isFirstProRev: false,
    isLastProRev: false,
    hasNextProRev: false,
    hasPreviousProRev: false,


    cart: [],
    totalQuantity: 0,
    addCartLoading: false,
    addCartError: null,

    getCartLoading: false,
    getCartError: null,

    adjustCartLoading: false,
    adjustCartError: null,

    removeCartLoading: false,
    removeCartError: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsByCategory.pending, (state) => {
                state.getCatLoading = true;
                state.getCatError = null;
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.getCatLoading = false;
                state.getCatError = null;

                state.catProducts = action.payload?.products || [];
                state.totalCatProducts = action.payload?.totalProducts || 0;
                state.totalCatPages = action.payload?.totalPages || 0;
                state.catPageProducts = action.payload?.pageProducts || 0;

                state.isFirstCat = action.payload?.isFirst || false;
                state.isLastCat = action.payload?.isLast || false;
                state.hasNextCat = action.payload?.hasNext || false;
                state.hasPreviousCat = action.payload?.hasPrevious || false;
            })
            .addCase(getProductsByCategory.rejected, (state, action) => {
                state.getCatLoading = false;
                state.getCatError = action.payload?.message || "Something went wrong!";
            })

            .addCase(getProductsBySearch.pending, (state) => {
                state.getSchLoading = true;
                state.getSchError = null;
            })
            .addCase(getProductsBySearch.fulfilled, (state, action) => {
                state.getSchLoading = false;
                state.getSchError = null;

                state.schProducts = action.payload?.products || [];
                state.totalSchProducts = action.payload?.totalProducts || 0;
                state.totalSchPages = action.payload?.totalPages || 0;
                state.schPageProducts = action.payload?.pageProducts || 0;

                state.isFirstSch = action.payload?.isFirst || false;
                state.isLastSch = action.payload?.isLast || false;
                state.hasNextSch = action.payload?.hasNext || false;
                state.hasPreviousSch = action.payload?.hasPrevious || false;
            })
            .addCase(getProductsBySearch.rejected, (state, action) => {
                state.getSchLoading = false;
                state.getSchError = action.payload?.message || "Something went wrong!";
            })

            .addCase(getProductDetails.pending, (state) => {
                state.getDetailsLoading = true;
                state.getDetailsError = null;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.getDetailsLoading = false;
                state.getDetailsError = null;
                state.productDetails = action.payload?.productDetails || null;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.getDetailsLoading = false;
                state.getDetailsError = action.payload?.message || "Something went wrong!";
            })

            .addCase(getReviews.pending, (state) => {
                state.proRevLoading = true;
                state.proRevError = null;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.proRevLoading = false;
                state.proRevError = null;

                state.proReviews = action.payload?.reviews || [];
                state.totalProRev = action.payload?.totalReviews || 0;
                state.totalProRevPages = action.payload?.totalPages || 0;
                state.pageProRev = action.payload?.pageReviews || 0;

                state.isFirstProRev = action.payload?.isFirst || false;
                state.isLastProRev = action.payload?.isLast || false;
                state.hasNextProRev = action.payload?.hasNext || false;
                state.hasPreviousProRev = action.payload?.hasPrevious || false;
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.proRevLoading = false;
                state.proRevError = action.payload?.message || "Something went wrong!";
            })

            .addCase(addCart.pending, (state) => {
                state.addCartLoading = true;
                state.addCartError = null;
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.addCartLoading = false;
                state.addCartError = null;
                state.totalQuantity = action.payload?.totalQuantity || 0;
            })
            .addCase(addCart.rejected, (state, action) => {
                state.addCartLoading = false;
                state.addCartError = action.payload?.message || "Something went wrong!";
            })

            .addCase(getCart.pending, (state) => {
                state.getCartLoading = true;
                state.getCartError = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.getCartLoading = false;
                state.getCartError = null;
                state.cart = action.payload?.cart || [];
                state.totalQuantity = action.payload?.totalQuantity || 0;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.getCartLoading = false;
                state.getCartError = action.payload?.message || "Something went wrong!";
            })

            .addCase(adjustCart.pending, (state) => {
                state.adjustCartLoading = true;
                state.removeCartError = null;
            })
            .addCase(adjustCart.fulfilled, (state, action) => {
                state.adjustCartLoading = false;
                state.removeCartError = null;
                state.cart = action.payload?.cart || [];
                state.totalQuantity = action.payload?.totalQuantity || 0;
            })
            .addCase(adjustCart.rejected, (state, action) => {
                state.adjustCartLoading = false;
                state.removeCartError = action.payload?.message || "Something went wrong!";
            })

            .addCase(removeCart.pending, (state) => {
                state.removeCartLoading = true;
                state.removeCartError = null;
            })
            .addCase(removeCart.fulfilled, (state, action) => {
                state.removeCartLoading = false;
                state.removeCartError = null;
                state.cart = action.payload?.cart || [];
                state.totalQuantity = action.payload?.totalQuantity || 0;
            })
            .addCase(removeCart.rejected, (state, action) => {
                state.removeCartLoading = false;
                state.removeCartError = action.payload?.message || "Something went wrong!";
            });
    },
});


export default productSlice.reducer;