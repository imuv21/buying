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
    async ({ page, size, search, sortBy, order }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/api/v1/admin/get-users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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

export const getOrders = createAsyncThunk(
    'admin/getOrders',
    async ({ page, size, sortBy, order }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/api/v1/admin/get-orders`, {
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
    catError: null,

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
    hasPreviousOrd: false
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
    },
});


export const { clearErrors } = adminSlice.actions;
export default adminSlice.reducer;