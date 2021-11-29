import axios from "axios";
import {
    addDashboard,
    deleteContract,
    errorDashboard,
    getDataDashboard,
    getDataService,
    loadDataDashboard
} from "../reducers/reducer";

function actionGetDashboard() {
    return dispatch=>{
        axios.get('http://localhost:3005/dashboard')
            .then(({data})=>dispatch(getDataDashboard(data)))
    }
}
function actionFindService(value) {
    return dispatch=>{
        dispatch(loadDataDashboard())
        axios.post('http://localhost:3005/dashboard/findService',{id:value})
            .then(({data})=>dispatch(getDataService({id:Number(value),data})))
            .catch(({error})=>dispatch(errorDashboard(error)))
    }
}
function actionAddDashboard(data) {
    console.log(data);
    return dispatch=>{
        axios.post('http://localhost:3005/dashboard/add',data)
            .then(()=>dispatch(addDashboard(data)))
            .catch((error)=>dispatch(errorDashboard(error)))
    }
}
function actionDeleteContract(current) {
    return dispatch=>{
        axios({
            method:'delete',
            url:'http://localhost:3005/dashboard/delete-contract',
            data:{
                current
            }
        })
            .then(()=>dispatch(deleteContract(current)))
            .catch(error=>console.log(error))
    }
}
export {
    actionGetDashboard,
    actionFindService,
    actionAddDashboard,
    actionDeleteContract
}