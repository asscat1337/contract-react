import {loginUser, errorUser, loadAuthUser,logoutUser,resetPassword} from "../reducers/AuthReducer";
import axios from "axios";




function actionsLoginUser(user){
    return dispatch=>{
        console.log(process.env)
        dispatch(loadAuthUser())
        axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`,user)
            .then(({data})=>{
                dispatch(loginUser(data))
                sessionStorage.setItem('auth',data.success);
                sessionStorage.setItem('token',data.token)
            })
            .catch((error)=>dispatch(errorUser(error.response.data)))
    }
}
function actionsLogoutUser(){
    return dispatch=>{
       dispatch(logoutUser())
        localStorage.clear()
    }
}
function actionsResetPassword(data){
        return dispatch=>{
            axios.post(`${process.env.REACT_APP_BASE_URL}/auth/reset-password`,data)
                .then(({data})=>dispatch(resetPassword(data)))
                .catch(({data})=>dispatch(errorUser(data)))
        }
}

export {actionsLoginUser,actionsLogoutUser,actionsResetPassword}