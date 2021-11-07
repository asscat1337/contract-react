import {LOAD_PATIENT,SHOW_PATIENT} from "../types";

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
            }
            default: return state
        }
}
export const showPatient =(payload)=>({type:SHOW_PATIENT,payload})

export default patientReducer