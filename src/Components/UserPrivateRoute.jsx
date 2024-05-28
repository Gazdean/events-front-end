import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from '../Contexts/AuthContext';

export default function UserPrivateRoute({children}) {
    const { currentUser } = useAuth();

    return currentUser ? children : <Navigate to="/sign-in" />;
}
