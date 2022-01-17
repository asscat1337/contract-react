import {SHOW_ORG,ERROR_ORG} from "../types";

const initialState={
    error:'',
    organization:[],
    loading:true
}

function organizationReducer(state = initialState,action){
        switch (action.type) {
            case SHOW_ORG :
                return {
                    loading:false,
                    organization: action.payload,
                    error:''
                }
            case  ERROR_ORG :
                return {
                    ...state,
                    loading: true,
                    error:action.payload
                }
            default: return state
        }
}

export const showOrg=(payload)=>({type:SHOW_ORG,payload});
export const errorOrg=(payload)=>({type:ERROR_ORG,payload})
export default organizationReducer