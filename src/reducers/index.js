import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import {registration} from "./register.reducer";
import { authorization } from "./oauth.reducer";
import { alert } from "./alert.reducer";
import {createMeeting, getMeeting, getMeetings} from "./meetings.reducer";

const rootReducer = combineReducers({
    authentication,
    authorization,
    alert,
    registration,
    createMeeting,
    getMeeting,
    getMeetings
});
export default rootReducer;