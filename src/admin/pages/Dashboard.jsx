import React, { useState, useRef } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { accordionData, showToast } from '../../assets/Schemas';
import { logout } from '../../slices/authSlice';
import logo from '../../assets/images/logo.jpg';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeBrick, setActiveBrick] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const [isLogout, setIsLogout] = useState(false);
    const contentRefs = useRef([]);


    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            contentRefs.current[index].style.maxHeight = '';
            setActiveIndex(null);
        } else {
            contentRefs.current.forEach((ref, i) => {
                if (i === index) {
                    ref.style.maxHeight = ref.scrollHeight + 'px';
                } else {
                    ref.style.maxHeight = '';
                }
            });
            setActiveIndex(index);
        }
    };

    const handleBrickClick = (brickName, route) => {
        setActiveBrick(brickName);
        navigate(route);
    };

    const logoutHandler = async (e) => {
        e.preventDefault();
        if (isLogout) return;
        setIsLogout(true);
        try {
            dispatch(logout());
            sessionStorage.clear();
            showToast('success', 'Logout Successfully!');
            navigate('/admin/login');
            setIsLogout(false);
        } catch (error) {
            showToast('error', 'Something went wrong!');
        }
    }



    return (
        <section className="dashboard">

            <div className="accordion">
                <div className='accordionCover'>
                    <div className="admin-logo">
                        <img src={logo} alt="logo" />
                    </div>
                    {accordionData.map((accordion, index) => (
                        <div className="accordion__item" key={index}>

                            <div className={`accordion__header ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleAccordion(index)}>
                                <div className="textBig">{accordion.header}</div>
                            </div>

                            <div className="accordion__content" ref={(el) => (contentRefs.current[index] = el)}>
                                <div className="brickCover">
                                    {accordion.bricks.map((brick, brickIndex) => (
                                        <div key={brickIndex} className={`brick ${activeBrick === brick.name ? 'active' : ''}`} onClick={() => handleBrickClick(brick.name, brick.route)}>
                                            <img src={brick.icon ? brick.icon : ""} alt="icon" /> {brick.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                <button onClick={logoutHandler} className='logoutBtn' disabled={isLogout}>{isLogout ? `Loging out...` : `Logout`} <ExitToAppIcon /></button>
            </div>

            <div className="adminPage">
                <Outlet />
            </div>

        </section>
    );
};

export default Dashboard