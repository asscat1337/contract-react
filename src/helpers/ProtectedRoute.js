import React from "react";
import {Navigate,useLocation} from 'react-router-dom'
import {useSelector} from "react-redux";


function ProtectedRoute({children}){
    const isAuth = sessionStorage.getItem('auth')
    const location = useLocation()
    return !!isAuth ? children :
        <Navigate
            to="/login"
            state={{path:location.pathname}}
        />;
}

export default ProtectedRoute