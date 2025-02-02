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
            });
    },
});


export default productSlice.reducer;