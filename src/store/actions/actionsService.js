import axios from "axios";
import {addService,
    errorService,
    showEditService,
    deleteService,
    editService
} from "../reducers/reducer";


function actionsAddService(current){
        return dispatch=>{
            axios.post('http://localhost:3005/dashboard/addService',current)
                .then(({data})=>dispatch(addService(data)))
                .catch(error=>dispatch(errorService(error)))
        }
}
function actionGetCurrentService(id){
    return dispatch=>{
        axios.get(`http://localhost:3005/dashboard/getService/${id}`)
            .then(({data})=>dispatch(showEditService(data)))
            .catch(error=>dispatch(errorService(error)))
    }
}
function actionDeleteService(id){
    return dispatch=>{
        axios.post(`http://localhost:3005/dashboard/delete-service`,{id})
            .then(()=>dispatch(deleteService(id)))
            .catch(error=>dispatch(errorService(error)))
    }
}
function actionEditService(data){
    return dispatch=>{
        axios.post('http://localhost:3005/dashboard/update-service',data)
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