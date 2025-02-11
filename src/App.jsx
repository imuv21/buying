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
const Cart = lazy(() => import('./pages/shop/Cart'));
const PaymentSuccess  = lazy(() => import('./pages/shop/PaymentSuccess'));
const Orders = lazy(() => import('./pages/shop/Orders'));
const OrderDetails = lazy(() => import('./pages/shop/OrderDetails'));

//public & private
const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/shop/Category'));
const Search = lazy(() => import('./pages/shop/Search'));
const ProductDetails = lazy(() => import('./pages/shop/ProductDetails'));

//admin panel
const AdLogin = lazy(() => import('./admin/pages/AdLogin'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const AddNewProduct = lazy(() => import('./admin/pages/AddNewProduct'));
const EditProduct = lazy(() => import('./admin/pages/EditProduct'));
const ProductList = lazy(() => import('./admin/pages/ProductList'));
const Featured = lazy(() => import('./admin/pages/Featured'));
const AddFeature = lazy(() => import('./admin/pages/AddFeature'));
const CategoryList = lazy(() => import('./admin/pages/CategoryList'));
const UsersList = lazy(() => import('./admin/pages/UsersList'));
const OrdersList = lazy(() => import('./admin/pages/OrdersList'));
const AdminOrderDetail = lazy(() => import('./admin/pages/AdminOrderDetail'));
const ReviewsList = lazy(() => import('./admin/pages/ReviewsList'));
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
          <Route element={<Protector user={user} requiredRole={["Admin", "Manager"]} redirect="/admin/login" />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="add-new-product" element={<AddNewProduct />} />
              <Route path="edit-product/:productId" element={<EditProduct />} />
              <Route path="category-list" element={<CategoryList />} />
              <Route path="order-list" element={<OrdersList />} />
              <Route path='order-list/order-details/:orderId' element={<AdminOrderDetail />} />
              <Route path="reviews-list" element={<ReviewsList />} />
              <Route path="user-list" element={<UsersList />} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="product-list/product-details/:productId" element={<ProductDetailAdmin />} />
              <Route path="featured-products" element={<Featured />} />
              <Route path="add-new-featured-products" element={<AddFeature />} />
              <Route path="add-manager" element={<AddAdmin />} />
              <Route path="admin-list" element={<RoleManagement />} />
              <Route path="admin-category" element={<AdminCategory />} />
            </Route>
          </Route>

          {/* user routes (private) */}
          <Route element={<Protector user={user} requiredRole={["User", "Manager"]} redirect="/register" />}>
            <Route path='/profile' element={<Layout><Profile /></Layout>} />
            <Route path='/cart' element={<Layout><Cart /></Layout>} />
            <Route path='/payment-success' element={<Layout><PaymentSuccess /></Layout>} />
            <Route path='/orders' element={<Layout><Orders /></Layout>} />
            <Route path='/order-details/:orderId' element={<Layout><OrderDetails /></Layout>} />
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

          {/* not found */}
          <Route path='*' element={<div className='page flex center'>The path does not exist!</div>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;