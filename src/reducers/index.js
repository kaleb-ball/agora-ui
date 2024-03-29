import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import {registration} from "./register.reducer";
import {authorization, checkAuthorization} from "./oauth.reducer";
import { alert } from "./alert.reducer";
import {createMeeting, getMeeting, getMeetings} from "./meetings.reducer";
import {createInvite, deleteInvite} from "../actions/invite.actions";
import {getAllUsers} from "./user.reducer";

const rootReducer = combineReducers({
    authentication,
    authorization,
    checkAuthorization,
    alert,
    registration,
    createMeeting,
    getMeeting,
    getMeetings,
    createInvite,
    deleteInvite,
    getAllUsers
});
export default rootReducer;