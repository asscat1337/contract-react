import {GET_TYPE,LOAD_TYPE} from "../types";


const initialState = {
    types:[],
    loading:false,
};

function typeReducer(state = initialState,action){
    switch (action.type) {
        case GET_TYPE :
            return {
                loading:false,
                types:action.payload
            }
        case LOAD_TYPE :
            return {
                ...state,
                loading:true
            }
        default:
            return state
    }
}

export const getType=payload=>({type:GET_TYPE,payload});
export const loadType=()=>({type:LOAD_TYPE});

export default typeReducer