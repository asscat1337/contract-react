import {showDepartment,errorDepartment} from "../reducers/departmentReducer";
import axios from "axios";



function getDepartment() {
    return dispatch=>{
        axios.get('http://localhost:3005/dashboard/get-branch')
            .then(({data})=>dispatch(showDepartment(data)))
            .catch(error=>dispatch(errorDepartment(error)))
    }
}

export {
    getDepartment
}