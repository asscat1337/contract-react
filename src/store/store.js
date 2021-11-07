import {createStore,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from "./reducers/reducer";
import patientReducer from "./reducers/patientReducer";

const rootReducer=combineReducers({
    dashboard:reducer,
    patient:patientReducer
})

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))



export default store