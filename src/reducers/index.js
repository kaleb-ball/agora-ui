import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import {registration} from "./register.reducer";
import { authorization } from "./oauth.reducer";
import { alert } from "./alert.reducer";

const rootReducer = combineReducers({
    authentication,
    authorization,
    alert,
    registration
});
export default rootReducer;