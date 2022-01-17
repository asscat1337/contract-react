import axios from "axios";
import {getType,loadType} from "../reducers/typeReducer";
import {errorDashboard} from "../reducers/reducer";

function actionGetType(){
    return dispatch=>{
        dispatch(loadType());
        axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard/get-type`)
            .then(({data})=>dispatch(getType(data)))
            .catch(error=>dispatch(errorDashboard(error)))
    }
}


export {
    actionGetType
}