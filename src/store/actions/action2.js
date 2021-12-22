import axios from "axios";
import {getDataService,loadDataDashboard,errorDashboard} from "../reducers/reducer";

function action2(value) {
    return dispatch=>{
        dispatch(loadDataDashboard())
        axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/findService`,{id:value})
            .then(({data})=>dispatch(getDataService({id:Number(value),data,isLoad:true})))
            .catch(({error})=>dispatch(errorDashboard(error)))
    }
}
export default action2