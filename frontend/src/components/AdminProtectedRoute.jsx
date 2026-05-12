import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        
        if (payload.role !== "admin") {
            return <Navigate to="/" replace />; 
        }
    } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token"); 
        return <Navigate to="/login" replace />;
    }

    
    return children;
}