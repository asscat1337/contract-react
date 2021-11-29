import axios from "axios";
import {showPatient} from "../reducers/patientReducer";
function action3(value){
    return dispatch=>{

        axios.post('http://localhost:3005/dashboard/showPatient',{id:value})
            .then(({data})=>dispatch(showPatient({id:value,data})))
    }
}

export default action3