import {createStore,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import {persistStore,persistReducer} from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import reducer from "./reducers/reducer";
import patientReducer from "./reducers/patientReducer";
import organizationReducer from "./reducers/organizationReducer";
import departmentReducer from "./reducers/departmentReducer";
import authReducer from './reducers/AuthReducer'
import adminReducer from "./reducers/adminReducer";
import typeReducer from "./reducers/typeReducer";


const persistConfig = {
    key:'root',
    storage:sessionStorage,
}


const rootReducer=combineReducers({
    dashboard:reducer,
    patient:patientReducer,
    organization:organizationReducer,
    department:departmentReducer,
    auth:authReducer,
    type:typeReducer,
    admin:adminReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

export {store,persistor}