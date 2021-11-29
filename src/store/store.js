import {createStore,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from "./reducers/reducer";
import patientReducer from "./reducers/patientReducer";
import organizationReducer from "./reducers/organizationReducer";
import departmentReducer from "./reducers/departmentReducer";

const rootReducer=combineReducers({
    dashboard:reducer,
    patient:patientReducer,
    organization:organizationReducer,
    department:departmentReducer
})

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))



export default store