import axios from "axios";
import {
    addDashboard,
    deleteContract,
    errorDashboard,
    getDataDashboard,
    getDataService,
    loadDataDashboard,
    editContract,
    editDataContract
} from "../reducers/reducer";

function actionGetDashboard({page,size,branch,roles}) {
    return dispatch=>{
        dispatch(loadDataDashboard());
        axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard?page=${page}&size=${size}`,{
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
        axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/findService`,{id:value})
            .then(({data})=>dispatch(getDataService({id:Number(value),data})))
            .catch(({error})=>dispatch(errorDashboard(error)))
    }
}
function actionAddDashboard(data) {
    const {file} = data
    const formData = new FormData()
    formData.append('file',file)
    return dispatch=>{
        axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/add`,data)
            .then(({data})=>{
                dispatch(addDashboard(data))
                if(file){
                    axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/upload-file/${data.contract_id}`,formData)
                }
            })
            .catch((error)=>dispatch(errorDashboard(error)))
    }
}

async function downloadFile(data){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/dashboard/download-file/${data.contract_id}`)
    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = data.filename
    document.body.append(link)
    link.click()
}

function actionDeleteContract(current) {
    return dispatch=>{
        axios({
            method:'delete',
            url:`${process.env.REACT_APP_BASE_URL}/dashboard/delete-contract`,
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
        axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/edit-contract`,data)
            .then(({data})=>dispatch(editDataContract(data)))
            .catch(error=>dispatch(errorDashboard(error)))
    }
}

function actionAddContractFromFile(data){
    const formData = new FormData()
    formData.append('file',data);
    return dispatch=>{
        axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/upload-file`,formData)
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
    actionAddContractFromFile,
    downloadFile
}