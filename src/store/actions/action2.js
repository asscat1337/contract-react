import axios from "axios";
import {getDataService,loadDataDashboard,errorDashboard} from "../reducers/reducer";

function action2(value) {
    return dispatch=>{
        dispatch(loadDataDashboard())
        axios.post('http://localhost:3005/dashboard/findService',{id:value})
            .then(({data})=>dispatch(getDataService({id:Number(value),data})))
            .catch(({error})=>dispatch(errorDashboard(error)))
    }
}
export default action2