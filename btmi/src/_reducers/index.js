import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import {registration} from "./register.reducer";

const rootReducer = combineReducers({
    authentication,
    registration
});
export default rootReducer;