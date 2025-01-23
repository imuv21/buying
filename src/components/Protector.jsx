import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protector = ({ user, requiredRole = null, redirect = "/login", children }) => {
    if (!user) return <Navigate to={redirect} />;
    if (requiredRole && user.role !== requiredRole) return <Navigate to={redirect} />;
    return children ? children : <Outlet />;
};

export default Protector;




