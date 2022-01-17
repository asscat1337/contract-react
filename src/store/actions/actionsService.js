import axios from "axios";
import {addService,
    errorService,
    showEditService,
    deleteService,
    editService
} from "../reducers/reducer";


function actionsAddService(current){
        return dispatch=>{
            axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/addService`,current)
                .then(({data})=>dispatch(addService(data)))
                .catch(error=>dispatch(errorService(error)))
        }
}
function actionGetCurrentService(id){
    return dispatch=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard/getService/${id}`)
            .then(({data})=>dispatch(showEditService(data)))
            .catch(error=>dispatch(errorService(error)))
    }
}
function actionDeleteService(data){
    return dispatch=>{
        axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/delete-service`,data)
            .then(()=>dispatch(deleteService(data.id)))
            .catch(error=>dispatch(errorService(error)))
    }
}
function actionEditService(data){
    return dispatch=>{
        axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/update-service`,data)
            .then(()=>dispatch(editService(data)))
            .catch(error=>dispatch(errorService(error)))
    }
}
export {
    actionsAddService,
    actionGetCurrentService,
    actionDeleteService,
    actionEditService
}