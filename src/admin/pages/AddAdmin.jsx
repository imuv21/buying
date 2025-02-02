import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { searchUsers } from '../../slices/searchUserSlice';
import { makeAdmin } from '../../slices/adminSlice';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';



const AddAdmin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users, userLoading, userError } = useSelector((state) => state.searchUser);
    const [isUpdating, setIsUpdating] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [userType, setUserType] = useState('USER');

    useEffect(() => {
        dispatch(searchUsers({ page,  userType, search: searchInput, size }));
    }, [dispatch, page, userType, searchInput, size]);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };
    const searchHandler = (e) => {
        if (e.key === 'Enter') {
            dispatch(searchUsers({ page,  userType, search: searchInput, size }));
        }
    };
    const postSearch = () => {
        dispatch(searchUsers({ page,  userType, search: searchInput, size }));
    };

    const makeAdminHandler = async (userId) => {
        if (isUpdating[userId]) return;

        setIsUpdating((prev) => ({ ...prev, [userId]: true }));

        try {
            const response = await dispatch(makeAdmin(userId)).unwrap();
            if (response.status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(searchUsers({ page,  userType, search: searchInput, size }));
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsUpdating((prev) => ({ ...prev, [userId]: false }));
        }
    };

    const back = () => {
        navigate('/dashboard/role-management');
    }


    return (
        <Fragment>
            <div className="backSection">
                <ArrowBackIosNewIcon onClick={back} /> <h1 className="heading">Add New Admin</h1>
            </div>

            <div className="flexcol g10 start-center wh">
                <p className="textBig fw-600">Search Users</p>
                <div className='searchCont'>
                    <input type="text" value={searchInput} placeholder='Search users...' onChange={handleInputChange} onKeyDown={searchHandler} />
                    <SearchIcon onClick={postSearch} />
                </div>
            </div>

            {userLoading ? (
                <p className="text">Searching...</p>
            ) : userError ? (
                <p className="text">Error loading users.</p>
            ) : users && users.length > 0 ? (
                <div className="flexcol g10 start-center wh">
                    {users.map((user, index) => (
                        <div key={index} className="wannabeAdmin">
                            <button onClick={() => makeAdminHandler(user.userId)} disabled={isUpdating[user.userId]}>{isUpdating[user.userId] ? `Making...` : `Make Admin`}</button>
                            <div className="flexcol g5 start-center wh">
                                <p className="text">
                                    {`${user.firstname}  ${user.lastname}`}
                                </p>
                                <p className="text fw-600">
                                    {user.email?.length > 25 ? `${user.email.substring(0, 25)}...` : user.email}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text">No users found!</p>
            )}

        </Fragment>
    )
}

export default AddAdmin