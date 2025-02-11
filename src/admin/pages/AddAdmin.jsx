import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsersBySearch, makeManager } from '../../slices/adminSlice';
import { showToast } from '../../assets/Schemas';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';


const AddAdmin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { schUsers, getSchLoading, getSchError } = useSelector((state) => state.admin);

    const [isUpdating, setIsUpdating] = useState({});
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [role, setRole] = useState("User");
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        dispatch(getUsersBySearch({ page, size, search: searchInput, role }));
    }, [dispatch, page, size, searchInput, role]);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };
    const searchHandler = (e) => {
        if (e.key === 'Enter') {
            dispatch(getUsersBySearch({ page, size, search: searchInput, role }));
        }
    };
    const postSearch = () => {
        dispatch(getUsersBySearch({ page, size, search: searchInput, role }));
    };

    const makeManagerHandler = async (userId) => {
        if (isUpdating[userId]) return;
        setIsUpdating((prev) => ({ ...prev, [userId]: true }));
        try {
            const response = await dispatch(makeManager(userId)).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
                dispatch(getUsersBySearch({ page, size, search: searchInput, role }));
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsUpdating((prev) => ({ ...prev, [userId]: false }));
        }
    };

    const goBack = () => {
        navigate('/dashboard/admin-list');
    }


    return (
        <Fragment>
            <div className="backSection">
                <ArrowBackIosNewIcon onClick={() => goBack()} /> <h1 className="heading">Add Manager</h1>
            </div>

            <div className="flexcol g10 start-center w100">
                <p className="textBig fw-600">Search Users</p>
                <div className='searchCont'>
                    <input type="text" value={searchInput} placeholder='Search users...' onChange={handleInputChange} onKeyDown={searchHandler} />
                    <SearchIcon onClick={postSearch} />
                </div>
            </div>

            {getSchLoading ? (<p className="text">Searching...</p>) : getSchError ? (<p className="text">Error loading users!</p>) : schUsers && schUsers.length > 0 ? (
                <div className="flexcol g10 start-center w100">
                    {schUsers.map((user) => (
                        <div key={user._id} className="wannabeAdmin">
                            <button style={{ width: '100px'}} onClick={() => makeManagerHandler(user._id)} disabled={isUpdating[user._id]}>{isUpdating[user._id] ? `Making...` : `Make Manager`}</button>
                            <div className="flexcol g5 start-center w100">
                                <p className="text">{`${user.firstName}  ${user.lastName}`}</p>
                                <p className="text fw-600">{user.email?.length > 25 ? `${user.email.substring(0, 25)}...` : user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (<p className="text">No users found!</p>)}
        </Fragment>
    )
}

export default AddAdmin