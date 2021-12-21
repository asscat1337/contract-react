import {
    showDepartment,
    errorDepartment,
    fileUpload
} from "../reducers/departmentReducer";
import axios from "axios";



function getDepartment() {
    return dispatch=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard/get-branch`)
            .then(({data})=>dispatch(showDepartment(data)))
            .catch(error=>dispatch(errorDepartment(error)))
    }
}
function actionsUploadDepartment(data){
        const formData = new FormData()
        formData.append('file',data)
        return dispatch=>{
            axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/upload-file`,formData)
                // .then(({data})=>dispatch(fileUpload(data)))
        }
}

export {
    getDepartment,
    actionsUploadDepartment
}