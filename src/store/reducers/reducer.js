import {
    GET_DATA_DASHBOARD,
    GET_DATA_SERVICE,
    LOAD_DATA_DASHBOARD,
    ERROR_DASHBOARD,
    ADD_DASHBOARD,
    DELETE_CONTRACT,
    ADD_SERVICE,
    ERROR_SERVICE,
    SHOW_SERVICE,
    DELETE_SERVICE,
    EDIT_SERVICE,
    EDIT_CONTRACT,
    UPLOAD_CONTRACT,
    GET_EDIT_CONTRACT,
    LOAD_SERVICE,
} from "../types";

const initialState = {
    data:[],
    editableService:[],
    loading:true,
    error:'',
    count:null,
    editContract:{}
}

function reducer(state = initialState,action){
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
                            isLoad:action.payload.isLoad,
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
                    if(item.contract_id===Number(action.payload.data.id)){
                        return{
                            ...item,
                            children:[...item.children,action.payload.data]
                        }
                    }
                    return item
                }),
                editContract:{
                    ...state.editContract,
                    sum_left:action.payload.data.sum_left
                },
                editableService: [...state.editableService,action.payload.data]
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
                editableService: action.payload.data
            }
        }
        case DELETE_SERVICE : {
            return {
                ...state,
                error:'',
                loading: false,
                editContract: {
                    ...state.editContract,
                    sum_left: state.editContract.sum_left + action.payload.service_cost
                },
                editableService: state.editableService.filter(item=>item.service_id !== action.payload.service_id)
            }
        }
        case EDIT_SERVICE : {
            return {
                ...state,
                error:'',
                loading:false,
                editContract: {
                    ...state.editContract,
                    sum_left:action.payload.data.sum_left
                },
                editableService: state.editableService.map(item=>{
                    if(item.service_id === Number(action.payload.data.id)){
                        return {
                            ...item,
                            service_name:action.payload.data.service_name,
                            service_cost:action.payload.data.service_cost,
                            service_count:action.payload.data.service_count,
                            service_left:action.payload.data.service_count
                        }
                    }else{
                        return item
                    }
                })
            }
        }
        case GET_EDIT_CONTRACT :
            return {
                ...state,
                editContract:action.payload
            }
        case EDIT_CONTRACT :
            return {
                ...state,
                data:state.data.map(item=>{
                    if(item.contract_id === action.payload.id){
                        return {
                            ...item,
                            ...action.payload
                        }
                    }else{
                        return item
                    }
                })
            }
        case LOAD_SERVICE :
            return {
                ...state,
                loading:true
            }
        default :
            return state
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
export const editContract=payload=>({type:GET_EDIT_CONTRACT,payload});
export const addContractFromFile=(payload)=>({type:UPLOAD_CONTRACT,payload});
export const editDataContract=(payload)=>({type:EDIT_CONTRACT,payload});
export const loadService=()=>({type:LOAD_SERVICE})


export default reducer