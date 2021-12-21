import {SHOW_DEPARTMENT,
    LOAD_DEPARTMENT,
    ERROR_DEPARTMENT,
    UPLOAD_FILE
} from '../types'

const initialState = {
    loading:true,
    error:'',
    department:[]
}


function departmentReducer(state=initialState,action){
        switch (action.type) {
            case SHOW_DEPARTMENT:
                return {
                    loading:false,
                    error:'',
                    department: action.payload
                }
            case LOAD_DEPARTMENT :
                return {
                    loading: true,
                    error:'',
                    department: []
                };
            case ERROR_DEPARTMENT :
                return {
                    loading: false,
                    error: action.payload,
                    department: [...state.department]
                };
            case UPLOAD_FILE :
                return {
                 loading:false,
                 department: [...state.department,action.payload]
                };
            default:
                return state
        }
}

export const showDepartment=payload=>({type:SHOW_DEPARTMENT,payload});
export const errorDepartment=payload=>({type:ERROR_DEPARTMENT,payload});
export const fileUpload=payload=>({type:UPLOAD_FILE,payload});
export default departmentReducer