import axios from "axios"
import {getUsers,deleteUser} from "../reducers/adminReducer";



function actionGetUser() {
        return dispatch=>{
            axios.get(`${process.env.REACT_APP_BASE_URL}/admin/get-users`)
                .then(({data})=>dispatch(getUsers(data)))
        }
}

function actionDeleteUser(userId){
    return dispatch=>{
        axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/delete-user`,{
            data:{
                user_id:userId
            }
        }).then(()=>dispatch(deleteUser(userId)))
    }
}


export {
    actionGetUser,
    actionDeleteUser
}