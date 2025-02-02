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
const VerifyPassword = lazy(() => import('./pages/auth/VerifyPassword'));

//private
const Profile = lazy(() => import('./pages/auth/Profile'));
// const Cart = lazy(() => import('./pages/shop/Cart'));
// const Order = lazy(() => import('./pages/shop/Order'));
// const OrderDetails = lazy(() => import('./pages/shop/OrderDetails'));

//public & private
const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/shop/Category'));
const Search = lazy(() => import('./pages/shop/Search'));
const ProductDetails = lazy(() => import('./pages/shop/ProductDetails'));


// const ContactUs = lazy(() => import('./pages/static/ContactUs'));
// const AboutUs = lazy(() => import('./pages/static/AboutUs'));
// const BulkOrder = lazy(() => import('./pages/static/BulkOrder'));
// const Privacy = lazy(() => import('./pages/static/Privacy'));
// const Refund = lazy(() => import('./pages/static/Refund'));
// const Shipping = lazy(() => import('./pages/static/Shipping'));
// const Term = lazy(() => import('./pages/static/Term'));

//admin panel
const AdLogin = lazy(() => import('./admin/pages/AdLogin'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const AddNewProduct = lazy(() => import('./admin/pages/AddNewProduct'));
const EditProduct = lazy(() => import('./admin/pages/EditProduct'));
const ProductList = lazy(() => import('./admin/pages/ProductList'));
const TopRated = lazy(() => import('./admin/pages/TopRated'));
const BestSeller = lazy(() => import('./admin/pages/BestSeller'));
const Featured = lazy(() => import('./admin/pages/Featured'));
const AddFeature = lazy(() => import('./admin/pages/AddFeature'));
const CategoryList = lazy(() => import('./admin/pages/CategoryList'));
const UsersList = lazy(() => import('./admin/pages/UsersList'));
const OrdersList = lazy(() => import('./admin/pages/OrdersList'));
const AdminOrderDetail = lazy(() => import('./admin/pages/AdminOrderDetail'));
const ReviewsList = lazy(() => import('./admin/pages/ReviewsList'));
const QuestionsList = lazy(() => import('./admin/pages/QuestionsList'));
const UserOrder = lazy(() => import('./admin/pages/UserOrder'));
const Reviews = lazy(() => import('./admin/pages/Reviews'));
const Questions = lazy(() => import('./admin/pages/Questions'));
const ProductDetailAdmin = lazy(() => import('./admin/pages/ProductDetailAdmin'));
const AdminCategory = lazy(() => import('./admin/pages/AdminCategory'));
const AddAdmin = lazy(() => import('./admin/pages/AddAdmin'));
const RoleManagement = lazy(() => import('./admin/pages/RoleManagement'));


function App() {

  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Toaster />
        <Routes>

          {/* admin routes (public) */}
          <Route element={<Protector user={!user} redirect='/' />}>
            <Route path='/admin/login' element={<AdLogin />} />
          </Route>

          {/* admin routes (private) */}
          <Route element={<Protector user={user} requiredRole="Admin" redirect="/admin/login" />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="add-new-product" element={<AddNewProduct />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route path="category-list" element={<CategoryList />} />
              <Route path="orders-list" element={<OrdersList />} />
              <Route path='order-details/:orderId' element={<AdminOrderDetail />} />
              <Route path="reviews-list" element={<ReviewsList />} />
              <Route path="questions-list" element={<QuestionsList />} />
              <Route path="user-list" element={<UsersList />} />
              <Route path="user-list/user-orders/:id" element={<UserOrder />} />
              <Route path="user-list/user-reviews/:id" element={<Reviews />} />
              <Route path="user-list/user-questions/:id" element={<Questions />} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="product-list/product-details/:id" element={<ProductDetailAdmin />} />
              <Route path="top-rated-products" element={<TopRated />} />
              <Route path="best-seller-products" element={<BestSeller />} />
              <Route path="featured-products" element={<Featured />} />
              <Route path="add-new-feature" element={<AddFeature />} />
              <Route path="add-new-admin" element={<AddAdmin />} />
              <Route path="role-management" element={<RoleManagement />} />
              <Route path="admin-category" element={<AdminCategory />} />
            </Route>
          </Route>

          {/* user routes (private) */}
          <Route element={<Protector user={user} requiredRole="User" redirect="/register" />}>
            <Route path='/profile' element={<Layout><Profile /></Layout>} />
            {/* <Route path='/cart' element={<Layout><Cart /></Layout>} />
            <Route path='/orders' element={<Layout><Order /></Layout>} />
            <Route path='/order-details/:orderId' element={<Layout><OrderDetails /></Layout>} /> */}
          </Route>

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
          <Route path='/category' element={<Layout><Category /></Layout>} />
          <Route path='/search-results' element={<Layout><Search /></Layout>} />
          <Route path='/product-details/:productId' element={<Layout><ProductDetails /></Layout>} />

          {/* <Route path='/contact-us' element={<Layout><ContactUs /></Layout>} />
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