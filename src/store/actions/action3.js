import axios from "axios";
import {showPatient,addPatient} from "../reducers/patientReducer";

function action3(value){
    return dispatch=>{
        axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/showPatient`,{id:value})
            .then(({data})=>dispatch(showPatient({id:value,data})))
    }
}
function actionAddPatient(patient){
    return dispatch=>{
        axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/add-patient`,patient)
            .then(({data})=>dispatch(addPatient(data)))
    }
}

export{
    action3,
    actionAddPatient
}