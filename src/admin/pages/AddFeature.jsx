import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductsBySearch } from '../../slices/productSlice';
import { addToFeatured } from '../../slices/adminSlice';
import { showToast } from '../../assets/Schemas';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';



const AddFeature = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { schProducts, getSchLoading, getSchError } = useSelector((state) => state.product);

    const [isUpdating, setIsUpdating] = useState({});
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [searchInput, setSearchInput] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("asc");


    useEffect(() => {
        dispatch(getProductsBySearch({ page, size, search: searchInput, sortBy, order }));
    }, [dispatch, page, size, searchInput, sortBy, order]);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };
    const searchHandler = (e) => {
        if (e.key === 'Enter') {
            dispatch(getProductsBySearch({ page, size, search: searchInput, sortBy, order }));
        }
    };
    const postSearch = () => {
        dispatch(getProductsBySearch({ page, size, search: searchInput, sortBy, order }));
    };

    const addToFeaturedHandler = async (productId) => {
        if (isUpdating[productId]) return;
        setIsUpdating((prev) => ({ ...prev, [productId]: true }));
        try {
            const response = await dispatch(addToFeatured(productId)).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
                dispatch(getProductsBySearch({ page, size, search: searchInput, sortBy, order }));
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsUpdating((prev) => ({ ...prev, [productId]: false }));
        }
    };

    const goBack = () => {
        navigate('/dashboard/featured-products');
    }


    return (
        <Fragment>
            <div className="backSection">
                <ArrowBackIosNewIcon onClick={() => goBack()} /> <h1 className="heading">Add Featured Product</h1>
            </div>

            <div className="flexcol g10 start-center w100">
                <p className="textBig fw-600">Search Users</p>
                <div className='searchCont'>
                    <input type="text" value={searchInput} placeholder='Search users...' onChange={handleInputChange} onKeyDown={searchHandler} />
                    <SearchIcon onClick={postSearch} />
                </div>
            </div>

            {getSchLoading ? (<p className="text">Searching...</p>) : getSchError ? (<p className="text">Error loading products!</p>) : schProducts && schProducts.length > 0 ? (
                <div className="flexcol g10 start-center w100">
                    {schProducts.map((pro) => (
                        <div key={pro._id} className="wannabeAdmin">
                            <button style={{ width: 'fit-content' }} onClick={() => addToFeaturedHandler(pro._id)} disabled={pro.isFeatured || isUpdating[pro._id]}>{pro.isFeatured ? 'Featured' : isUpdating[pro._id] ? `Adding...` : `Add To Featured`}</button>
                            <div className="flexcol g5 start-center w100">
                                <p className="text">{pro.title?.length > 25 ? `${pro.title.substring(0, 25)}...` : pro.title}</p>
                                <p className="text fw-600">Ratings: {pro.averageRating}/5</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (<p className="text">No products found!</p>)}
        </Fragment>
    )
}

export default AddFeature