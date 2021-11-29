import axios from "axios";
import {showOrg,errorOrg} from "../reducers/organizationReducer";

function getOrganization(){
    return dispatch=>{
        axios.get('http://localhost:3005/dashboard/add-dog')
            .then(({data})=>dispatch(showOrg(data)))
            .catch(error=>dispatch(errorOrg(error)))
    }
}


export {
    getOrganization
}