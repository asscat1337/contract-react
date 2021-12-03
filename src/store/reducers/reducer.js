import {GET_DATA_DASHBOARD,
    GET_DATA_SERVICE,
    LOAD_DATA_DASHBOARD,
    ERROR_DASHBOARD,
    ADD_DASHBOARD,
    DELETE_CONTRACT,
    ADD_SERVICE,
    ERROR_SERVICE,
    SHOW_SERVICE,
    DELETE_SERVICE,
    EDIT_SERVICE
} from "../types";

const initialState = {
    data:[],
    editableService:[],
    loading:true,
    error:'',
    count:null
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
                loading:false,
                data:action.payload.rows,
                count:action.payload.count,
                error:''
            };
        case GET_DATA_SERVICE:
            return {
                ...state,
                loading: false,
                data: state.data.map(item=>{
                    if(item.contract_id === action.payload.id){
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
        case ADD_DASHBOARD :{
            return {
                ...state,
                loading: false,
                data: [...state.data,action.payload]
            }
        }
        case DELETE_CONTRACT : {
            return {
                ...state,
                data: state.data.filter(item=>item.contract_id !== action.payload)
            }
        }
        case ADD_SERVICE :{
            return {
                ...state,
                data: state.data.map(item=>{
                    console.log(action.payload)
                    if(item.contract_id===Number(action.payload.agreement_id)){
                        return{
                            ...item,
                            children:[...item.children,action.payload]
                        }
                    }
                    return item
                }),
                editableService: [...state.editableService,action.payload]
            }
        }
        case ERROR_SERVICE : {
            return {
                ...state,
                error:action.payload,
                loading:true,
            }
        }
        case SHOW_SERVICE :{
            return {
                ...state,
                error:'',
                loading:false,
                editableService: action.payload
            }
        }
        case DELETE_SERVICE : {
            return {
                ...state,
                error:'',
                loading: false,
                editableService: state.editableService.filter(item=>item.services_id !== action.payload)
            }
        }
        case EDIT_SERVICE : {
            return {
                ...state,
                error:'',
                loading:false,
                editableService: state.editableService.map(item=>{
                    if(item.services_id === action.payload.id){
                        return {
                            ...item,
                            service_name:action.payload.serviceName,
                            service_cost:action.payload.serviceCost,
                            service_count:action.payload.serviceCount,
                            service_left:action.payload.serviceCount
                        }
                    }else{
                        return item
                    }
                })
            }
        }
        default : return state
    }
}
export const getDataDashboard = (payload)=>({type:GET_DATA_DASHBOARD,payload});
export const getDataService = (payload)=>({type:GET_DATA_SERVICE,payload});
export const loadDataDashboard=()=>({type:LOAD_DATA_DASHBOARD});
export const errorDashboard=(payload)=>({type:ERROR_DASHBOARD,payload});
export const addDashboard=(payload)=>({type:ADD_DASHBOARD,payload});
export const deleteContract=(payload)=>({type:DELETE_CONTRACT,payload});
export const addService=(payload)=>({type:ADD_SERVICE,payload});
export const errorService=(payload)=>({type:ERROR_SERVICE,payload});
export const showEditService=(payload)=>({type:SHOW_SERVICE,payload});
export const deleteService=(payload)=>({type:DELETE_SERVICE,payload});
export const editService=(payload)=>({type:EDIT_SERVICE,payload});

export default reducer