import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import {registration} from "./register.reducer";
import { alert } from "./alert.reducer";

const rootReducer = combineReducers({
    authentication,
    alert,
    registration
});
export default rootReducer;