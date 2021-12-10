import {LOAD_PATIENT,
    SHOW_PATIENT,
    ERROR_PATIENT,
    ADD_PATIENT
} from "../types";

const initialState = {
    patient:[],
    loading:false,
    error:''
}

function patientReducer(state = initialState,action){
        switch (action.type) {
            case LOAD_PATIENT:{
                return {
                    ...state,
                    loading:true,
                    error:''
                }
            }
            case SHOW_PATIENT :
                return {
                ...state,
                loading: false,
                patient:[...state.patient,action.payload].flat()
            };
            case ERROR_PATIENT :
                return {
                    ...state,
                    loading:true,
                    error:action.payload
                };
            case ADD_PATIENT :
                return {
                    loading:false,
                    error:'',
                    patient: [...state.patient,action.payload]
                }
            default: return state
        }
}
export const showPatient =(payload)=>({type:SHOW_PATIENT,payload});
export const addPatient=(payload)=>({type:ADD_PATIENT,payload})

export default patientReducer