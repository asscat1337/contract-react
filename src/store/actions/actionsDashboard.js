import axios from "axios";
import {
    addDashboard,
    deleteContract,
    errorDashboard,
    getDataDashboard,
    getDataService,
    loadDataDashboard,
    editContract,
    addContractFromFile
} from "../reducers/reducer";

function actionGetDashboard({page,size,branch,roles}) {
    return dispatch=>{
        dispatch(loadDataDashboard());
        axios.get(`http://localhost:3005/dashboard?page=${page}&size=${size}`,{
            headers:{
                "Authorization":`Bearer ${sessionStorage.getItem('token')}`
            },
            params:{
              branch: branch ?? null,
              roles:roles
            }
        })
            .then(({data})=>dispatch(getDataDashboard(
                {count:Math.ceil(data.count/size),rows:data.rows}
            )))
            .catch(error=>dispatch(errorDashboard(error)))
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
function actionEditDataContract(current){
    return dispatch=>{
        dispatch(editContract(current))
    }
}
function actionEditContract(data){
    return dispatch=>{
        axios.post('http://localhost:3005/dashobard/edit-contract',data)
            .then(({data})=>dispatch)
            .catch(error=>dispatch(errorDashboard(error)))
    }
}

function actionAddContractFromFile(data){
    const formData = new FormData()
    formData.append('file',data);
    return dispatch=>{
        axios.post('http://localhost:3005/dashboard/upload-file',formData)
            .then(({data})=>console.log(data))
    }
}


export {
    actionGetDashboard,
    actionFindService,
    actionAddDashboard,
    actionDeleteContract,
    actionEditDataContract,
    actionEditContract,
    actionAddContractFromFile
}