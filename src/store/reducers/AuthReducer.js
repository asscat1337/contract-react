import {LOGIN_USER,
    REGISTER_USER,
    ERROR_AUTH,
    LOAD_AUTH,
    LOGOUT_USER,
    RESET_PASSWORD,
    GET_ROLE
} from "../types";


const initialState={
    user:{},
    auth:false,
    role:'',
    loading:true,
    roles:[],
    message:''
};

function AuthReducer(state=initialState,action){
    switch (action.type) {
        case LOGIN_USER :
            return {
                loading: false,
                user:action.payload,
                auth:true,
                error: ''
            };
        case REGISTER_USER :{
            return {
                user:action.payload
            }
        }
        case LOAD_AUTH :
            return {
                ...state,
                loading:true
            }
        case ERROR_AUTH :
            return {
                ...state,
                loading:true,
                message:action.payload
            };
        case LOGOUT_USER :
            return{
                user : {},
                auth: false,
                role:'',
                error: ''
            };
        case RESET_PASSWORD :
            return {
                ...state,
                message:action.payload
            }
        case GET_ROLE :
            return {
                ...state,
                roles:action.payload
            }
        default : return state

    }
}

export const loginUser=(payload)=>({type:LOGIN_USER,payload});
export const errorUser=(payload)=>({type:ERROR_AUTH,payload});
export const loadAuthUser=()=>({type:LOAD_AUTH});
export const logoutUser=()=>({type:LOGOUT_USER});
export const resetPassword=(payload)=>({type:RESET_PASSWORD,payload});
export const registerUser=(payload)=>({type:REGISTER_USER,payload});
export const getRole=(payload)=>({type:GET_ROLE,payload});

export default AuthReducer