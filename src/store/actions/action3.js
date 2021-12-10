import axios from "axios";
import {showPatient,addPatient} from "../reducers/patientReducer";

function action3(value){
    return dispatch=>{
        axios.post('http://localhost:3005/dashboard/showPatient',{id:value})
            .then(({data})=>dispatch(showPatient({id:value,data})))
    }
}
function actionAddPatient(patient){
    return dispatch=>{
        axios.post('http://localhost:3005/dashobard/add-patient',patient)
            .then(({data})=>dispatch(addPatient(data)))
    }
}

export{
    action3,
    actionAddPatient
}