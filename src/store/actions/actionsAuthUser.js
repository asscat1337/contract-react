import {loginUser,
    errorUser,
    loadAuthUser,
    logoutUser,
    resetPassword,
    getRole
} from "../reducers/AuthReducer";
import {registerUser} from "../reducers/adminReducer";


import axios from "axios";



function actionsLoginUser(user,navigate){
    return dispatch=>{
         dispatch(loadAuthUser())
        axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`,user)
            .then(({data})=>{
                dispatch(loginUser(data))
                sessionStorage.setItem('auth',data.success);
                sessionStorage.setItem('token',data.token)
                navigate('/dashboard',{replace:true})
                if(data.role === 4){
                    navigate('/admin')
                }
            })
            .catch((error)=>dispatch(errorUser(error.response.data)))
    }
}
function actionsLogoutUser(){
    return dispatch=>{
       dispatch(logoutUser())
    }
}
function actionsResetPassword(data){
        return dispatch=>{
            axios.post(`${process.env.REACT_APP_BASE_URL}/auth/reset-password`,data)
                .then(({data})=>dispatch(resetPassword(data)))
                .catch(({data})=>dispatch(errorUser(data)))
        }
}
function actionsRegisterUser(data){
    return dispatch=>{
        axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`,data)
            .then(({data})=>dispatch(registerUser(data)))
            .catch(error=>dispatch(errorUser(error)))
    }
}
function actionsGetRole() {
    return dispatch=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/auth/get-role`)
            .then(({data})=>dispatch(getRole(data)))
            .catch(error=>dispatch(errorUser(error)))
    }
}


export {
    actionsLoginUser,
    actionsLogoutUser,
    actionsResetPassword,
    actionsRegisterUser,
    actionsGetRole
}