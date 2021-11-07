import axios from "axios";
import {getDataDashboard} from "../reducers/reducer";

function action1() {
    return dispatch=>{
        axios.get('http://localhost:3005/dashboard')
            .then(data=>dispatch(getDataDashboard(data.data)))
    }
}
export default action1