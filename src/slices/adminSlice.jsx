import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


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
    async (productData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.patch(`${BASE_URL}/api/v1/admin/edit-product`, productData, {
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

export const deleteProduct = createAsyncThunk(
    'admin/deleteProduct',
    async (productId, { rejectWithValue, getState }) => {
        try {
            const { admin } = getState();
            const token = admin.token;
            const response = await axios.delete(`${BASE_URL}/api/v1/admin/deleteProduct/${productId}`, {
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

export const getCategory = createAsyncThunk(
    'admin/getCategory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/user/get-category`, {
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


const initialState = {

    products: [],
    addLoading: false,
    addErrors: null,
    addError: null,

    editLoading: false,
    editErrors: null,
    editError: null,

    delLoading: false,
    delError: null,

    tags: [],
    tagLoading: false,
    tagError: null,

    categories: [],
    catLoading: false,
    catError: null
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
            state.delError = null;
            state.tagError = null;
            state.catError = null;
        }
    },
    extraReducers: (builder) => {
        builder
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
            .addCase(editProduct.fulfilled, (state, action) => {
                state.editLoading = false;
                state.editErrors = null;
                state.editError = null;
                state.products = action.payload?.products || [];
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
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.delLoading = false;
                state.delError = null;
                state.products = action.payload?.products || [];
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.delLoading = false;
                state.delError = action.payload?.message || "Something went wrong!";
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

            .addCase(getCategory.pending, (state) => {
                state.catLoading = true;
                state.catError = null;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.catLoading = false;
                state.catError = null;
                state.categories = action.payload?.categories || [];
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.catLoading = false;
                state.catError = action.payload?.message || "Something went wrong!";
            });
    },
});


export const { clearErrors } = adminSlice.actions;
export default adminSlice.reducer;