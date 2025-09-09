import React from 'react'
// import { isAuthenticated } from '../../utils/auth'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
    // utils/auth.js
    const isAuthenticated = () => {
        return !!localStorage.getItem("token"); // true if token exists
    };

    
    if (isAuthenticated()){
        return <Navigate to={"/questions"} replace />
    }
    return children;
}

export default PublicRoute