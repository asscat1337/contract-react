import React from "react";
import AccessDenied from "../pages/AcessDenied/AccessDenied";
import {Navigate,useLocation} from 'react-router-dom'
import {useSelector} from "react-redux";


function ProtectedRoute({component:Component,roles}){
    const roleUser = useSelector(state=>state.auth.user.role);
    const isAuth = sessionStorage.getItem('auth');
    const location = useLocation();
    const checkUserRole = roles.find(role=>role === roleUser);
    if(isAuth && checkUserRole){
        return <Component/>
    }
    if(isAuth && !checkUserRole){
        return <AccessDenied/>
    }
    return <Navigate
             to="/login"
            state={{path:location.pathname}}
         />;
}

export default ProtectedRoute