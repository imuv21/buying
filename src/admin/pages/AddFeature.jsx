import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../../slices/searchSlice';
import { addToFeatured } from '../../slices/adminProductSlice';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';


const AddFeature = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, getProLoading, getProError } = useSelector((state) => state.search);
    const [isUpdating, setIsUpdating] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [sort, setSort] = useState("PRICE_LOW_TO_HIGH");

    useEffect(() => {
        dispatch(searchProducts({ page, size, search: searchInput, sort }));
    }, [dispatch, page, size, searchInput, sort]);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };
    const searchHandler = (e) => {
        if (e.key === 'Enter') {
            dispatch(searchProducts({ page, size, search: searchInput, sort }));
        }
    };
    const postSearch = () => {
        dispatch(searchProducts({ page, size, search: searchInput, sort }));
    };

    const addFeature = async (productId) => {
        if (isUpdating[productId]) return;

        setIsUpdating((prev) => ({ ...prev, [productId]: true }));

        try {
            const response = await dispatch(addToFeatured(productId)).unwrap();
            if (response.status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsUpdating((prev) => ({ ...prev, [productId]: false }));
        }
    };

    const back = () => {
        navigate('/dashboard/featured-products');
    }


    return (
        <Fragment>
            <div className="backSection">
                <ArrowBackIosNewIcon onClick={back} /> <h1 className="heading">Add New Featured Product</h1>
            </div>

            <div className="flexcol g10 start-center wh">
                <p className="textBig fw-600">Search Products</p>
                <div className='searchCont'>
                    <input type="text" value={searchInput} placeholder='Search products...' onChange={handleInputChange} onKeyDown={searchHandler} />
                    <SearchIcon onClick={postSearch} />
                </div>
            </div>

            {getProLoading ? (
                <p className="text">Searching...</p>
            ) : getProError ? (
                <p className="text">Error loading products.</p>
            ) : products && products.length > 0 ? (
                <div className="flexcol g10 start-center wh">
                    {products.map((pro, index) => (
                        <div key={index} className="wannabeAdmin">
                            <button onClick={() => addFeature(pro.productId)} disabled={isUpdating[pro.productId]}>{isUpdating[pro.productId] ? `Adding...` : `Add`}</button>
                            <div className="flexcol g5 start-center wh">
                                <p className="text">
                                    {pro.name?.length > 45 ? `${pro.name.substring(0, 25)}...` : pro.name}
                                </p>
                                <p className="text fw-600">
                                    {pro.categoryPath?.length > 25 ? `${pro.categoryPath.substring(0, 25)}...` : pro.categoryPath}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text">No products found!</p>
            )}

        </Fragment>
    )
}

export default AddFeature