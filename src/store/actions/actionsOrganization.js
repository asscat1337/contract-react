import axios from "axios";
import {showOrg,errorOrg} from "../reducers/organizationReducer";

function getOrganization(){
    return dispatch=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard/add-dog`)
            .then(({data})=>dispatch(showOrg(data)))
            .catch(error=>dispatch(errorOrg(error)))
    }
}


export {
    getOrganization
}