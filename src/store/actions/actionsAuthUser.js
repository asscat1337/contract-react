import {loginUser, errorUser, loadAuthUser,logoutUser,resetPassword} from "../reducers/AuthReducer";
import axios from "axios";




function actionsLoginUser(user){
    return dispatch=>{
        dispatch(loadAuthUser())
        axios.post('http://localhost:3005/auth/login',user)
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
    }
}
function actionsResetPassword(data){
        return dispatch=>{
            axios.post('http://localhost:3005/auth/reset-password',data)
                .then(({data})=>dispatch(resetPassword(data)))
                .catch(({data})=>dispatch(errorUser(data)))
        }
}

export {actionsLoginUser,actionsLogoutUser,actionsResetPassword}