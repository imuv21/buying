import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const Protector = ({ user, requiredRole = null, redirect = "/login", children }) => {

    if (!user) return <Navigate to={redirect} />;

    if (requiredRole) {
        if (Array.isArray(requiredRole)) {
            if (!requiredRole.includes(user.role)) {
                return <Navigate to={redirect} />;
            }
        } else {
            if (user.role !== requiredRole) {
                return <Navigate to={redirect} />;
            }
        }
    }

    return children ? children : <Outlet />;
};

export default Protector;



