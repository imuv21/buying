import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { showToast } from '../assets/Schemas';
import { ExpandMore, Menu } from '@mui/icons-material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../assets/images/logo.jpg';


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { totalQuantity } = useSelector((state) => state.product);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const [isCatone, setIsCatone] = useState(false);
  const [isCatwo, setIsCatwo] = useState(false);

  //burger
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const home = () => {
    navigate('/');
  }

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(logout());
      sessionStorage.clear();
      showToast('success', 'Logout Successfully!');
      navigate('/register');
    } catch (error) {
      showToast('error', 'Something went wrong!');
    }
  }

  const postSearch = (e) => {
    e.preventDefault();
    navigate(`/search-results?query=${searchInput}`);
    setSearchInput('');
  }

  const searchHandler = (e) => {
    if (e.key === 'Enter') {
      postSearch(e);
    }
  }



  return (
    <Fragment>
      <div className='header'>
        <div className="flex center g10">
          <div className='header-burger' onClick={toggleMobileMenu}>
            <Menu />
          </div>
          <img className='logo' onClick={home} src={logo} alt="slasa" />
        </div>

        <div className='searchCont'>
          <input type="text" value={searchInput} placeholder='Search products...' onChange={(e) => setSearchInput(e.target.value)} onKeyDown={searchHandler} />
          <SearchIcon onClick={postSearch} />
        </div>

        <div className="nav-mobile">
          {!user && <Link to="/register" className="cartIcon"><h1 className='textBig'>Login / Signup</h1></Link>}
          {user && <Link to="/cart" className="cartIcon">
            <LocalMallIcon />
            <div className="cartcount">{totalQuantity || 0}</div>
          </Link>}
          <div className="cartIcon" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <AccountCircleIcon className='header-icon' />
            <div className={`hover-div hoverdivone ${isHovered ? 'visible' : ''}`}>
              <Link to='/' className='text'>Home page</Link>
              {user && <Link to='/profile' className='text'>Profile</Link>}
              {user && <Link to='/orders' className='text'>Orders</Link>}
              <Link to='/contact-us' className='text'>Contact us</Link>
              <Link to='/about-us' className='text'>About us</Link>
              {user && <Link onClick={logoutHandler} className='text'>Logout</Link>}
            </div>
          </div>
        </div>
      </div>
      <div className="catHeader">
        <a className="text" id="whatsapp-link" target="_blank" aria-label="Chat with us on WhatsApp" href="https://wa.me/+919026075867?text=Hi, I’d like to customize some merch!">
          Customize Your T-Shirt
        </a>
      </div>

      {mobileMenuOpen && <div className="overlay visible" onClick={toggleMobileMenu}></div>}

      <div className={`drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
          <div className='searchContTwo'>
            <input type="text" value={searchInput} placeholder='Search products...' onChange={(e) => setSearchInput(e.target.value)} onKeyDown={searchHandler} />
            <SearchIcon onClick={postSearch} />
          </div>

          <Link to="/" className='text'>Home page</Link>
          {!user && <Link to="/login" className='text'>Login</Link>}
          {!user && <Link to="/signup" className='text'>Signp</Link>}

          {user && <Link to='/profile' className='text'>Profile</Link>}
          {user && <Link to="/cart" className='text'>Cart</Link>}
          {user && <Link to='/orders' className='text'>Orders</Link>}

          <Link to='/all-category-list' className='text'>All Categories</Link>
          <Link to='/contact-us' className='text'>Contact us</Link>
          <Link to='/about-us' className='text'>About us</Link>

          {user && <Link onClick={logoutHandler}>Logout</Link>}
        </div>
      </div>
    </Fragment>
  )
};

export default Header;