import {showDepartment,errorDepartment} from "../reducers/departmentReducer";
import axios from "axios";



function getDepartment() {
    return dispatch=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard/get-branch`)
            .then(({data})=>dispatch(showDepartment(data)))
            .catch(error=>dispatch(errorDepartment(error)))
    }
}

export {
    getDepartment
}