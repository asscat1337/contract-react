import {GET_USERS,DELETE_USER,REGISTER_USER} from "../types";

const initialState = {
    list:[],
    loading:true,
    error:''
}


function adminReducer(state = initialState,action) {
        switch (action.type) {
            case GET_USERS :
                return {
                    list:action.payload,
                    loading:false,
                    error:''
                }
            case DELETE_USER :
                return {
                    ...state,
                    list: state.list.filter(item=>item.user_id !== action.payload)
                }
            case REGISTER_USER :
                return {
                    ...state,
                    list:[...state.list,action.payload.newUser]
                }
            default :
                return state
        }
}

export const getUsers=(payload)=>({type:GET_USERS,payload})
export const deleteUser=(payload)=>({type:DELETE_USER,payload})
export const registerUser=(payload)=>({type:REGISTER_USER,payload});

export default adminReducer