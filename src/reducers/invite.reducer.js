import {inviteConstants} from "../constants/inviteConstants";
import {getMeetings} from "./meetings.reducer";

export function createInvite(state={}, action) {
    switch (action.type){
        case inviteConstants.CREATE_REQUEST:
            return {};
        case inviteConstants.CREATE_SUCCESS:
            return {};
        case inviteConstants.CREATE_FAILURE:
            return {};
        default :
            return state;
    }
}

export function deleteInvite(state={}, action) {
    switch (action.type){
        case inviteConstants.DELETE_REQUEST:
            return {};
        case inviteConstants.DELETE_SUCCESS:
            return {};
        case inviteConstants.DELETE_FAILURE:
            return {};
        default :
            return state;
    }
}