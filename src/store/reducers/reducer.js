import {GET_DATA_DASHBOARD,GET_DATA_SERVICE,LOAD_DATA_DASHBOARD,ERROR_DASHBOARD} from "../types";

const initialState = {
    data:[],
    loading:true,
    error:'',
}

function reducer(state = initialState,action){
    console.log(action.payload)
    switch (action.type) {
        case LOAD_DATA_DASHBOARD :
            return {
                ...state,
                loading: true,
                error:''
            };
        case GET_DATA_DASHBOARD:
            return {
                ...state,
                loading:false,
                data:[...state.data,...action.payload]
            };
        case GET_DATA_SERVICE:
            return {
                ...state,
                loading: false,
                data: state.data.map(item=>{
                    if(item.agreement_id === action.payload.id){
                        return {
                            ...item,
                            children:[...item.children,action.payload.data].flat()
                        }
                    }
                    else{
                        return item
                    }
                })
            }
        case ERROR_DASHBOARD :
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        default : return state
    }
}
export const getDataDashboard = (payload)=>({type:GET_DATA_DASHBOARD,payload})
export const getDataService = (payload)=>({type:GET_DATA_SERVICE,payload})
export const loadDataDashboard=()=>({type:LOAD_DATA_DASHBOARD})
export const errorDashboard=(payload)=>({type:ERROR_DASHBOARD,payload})

export default reducer