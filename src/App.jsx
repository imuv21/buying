import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';


//components
import Loader from './components/Loader';
const Protector = lazy(() => import('./components/Protector'));
const Layout = lazy(() => import('./components/Layout'));

//public
const AuthPage = lazy(() => import('./pages/auth/AuthPage'));
const VerifyOTP = lazy(() => import('./pages/auth/VerifyOTP'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const VerifyPassword= lazy(() => import('./pages/auth/VerifyPassword'));

//private
// const Profile = lazy(() => import('./pages/auth/Profile'));
// const Cart = lazy(() => import('./pages/shop/Cart'));
// const Order = lazy(() => import('./pages/shop/Order'));
// const OrderDetails = lazy(() => import('./pages/shop/OrderDetails'));

//public & private
const Home = lazy(() => import('./pages/Home'));
// const Search = lazy(() => import('./pages/shop/Search'));
// const ProductDetails = lazy(() => import('./pages/shop/ProductDetails'));
// const Category = lazy(() => import('./pages/shop/Category'));

// const ContactUs = lazy(() => import('./pages/static/ContactUs'));
// const AboutUs = lazy(() => import('./pages/static/AboutUs'));
// const BulkOrder = lazy(() => import('./pages/static/BulkOrder'));
// const Privacy = lazy(() => import('./pages/static/Privacy'));
// const Refund = lazy(() => import('./pages/static/Refund'));
// const Shipping = lazy(() => import('./pages/static/Shipping'));
// const Term = lazy(() => import('./pages/static/Term'));

//admin panel

function App() {

  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Toaster />
        <Routes>

          {/* user routes (private) */}
          {/* <Route element={<Protector user={user} requiredRole="USER" redirect="/login" />}>
            <Route path='/profile' element={<Layout><Profile /></Layout>} />
            <Route path='/cart' element={<Layout><Cart /></Layout>} />
            <Route path='/orders' element={<Layout><Order /></Layout>} />
            <Route path='/order-details/:orderId' element={<Layout><OrderDetails /></Layout>} />
          </Route> */}

          {/* user routes (public) */}
          <Route element={<Protector user={!user} redirect='/' />}>
            <Route path='/register' element={<AuthPage />} />
            <Route path='/verify-otp' element={<VerifyOTP />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/new-password' element={<VerifyPassword />} />
          </Route>

          {/* user routes (public & private) */}
          <Route path='/' element={<Layout><Home /></Layout>} />
          <Route path='/loader' element={<Layout><Loader /></Layout>} />
          {/* <Route path='/product-details/:id' element={<Layout><ProductDetails /></Layout>} />
          <Route path='/search-results' element={<Layout><Search /></Layout>} />
          <Route path='/category' element={<Layout><Category /></Layout>} />

          <Route path='/contact-us' element={<Layout><ContactUs /></Layout>} />
          <Route path='/about-us' element={<Layout><AboutUs /></Layout>} />
          <Route path='/bulk-order' element={<Layout><BulkOrder /></Layout>} />
          <Route path='/privacy-policy' element={<Layout><Privacy /></Layout>} />
          <Route path='/shipping-policy' element={<Layout><Shipping /></Layout>} />
          <Route path='/return-policy' element={<Layout><Refund /></Layout>} />
          <Route path='/terms-and-conditions' element={<Layout><Term /></Layout>} /> */}

          {/* not found */}
          <Route path='*' element={<div className='page flex center'>The path does not exist!</div>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;