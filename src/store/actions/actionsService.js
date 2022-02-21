import axios from "axios";
import {addService,
    errorService,
    showEditService,
    deleteService,
    editService,
    loadService
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
        dispatch(loadService())
        axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard/getService/${id}`)
            .then(({data})=>dispatch(showEditService(data)))
            .catch(error=>dispatch(errorService(error)))
    }
}
function actionDeleteService(obj){
    return dispatch=>{
        const {agreement_id,service_id,service_cost} = obj
        axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/delete-service`,obj)
            .then(()=>dispatch(deleteService({agreement_id,service_id,service_cost})))
            .catch(error=>dispatch(errorService(error)))
    }
}
function actionEditService(edit){
    return dispatch=>{
        axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/update-service`,edit)
            .then(({data})=>dispatch(editService({id:edit.id,...data})))
            .catch(error=>dispatch(errorService(error)))
    }
}
export {
    actionsAddService,
    actionGetCurrentService,
    actionDeleteService,
    actionEditService
}