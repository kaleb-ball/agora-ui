import {inviteConstants} from "../constants/inviteConstants";

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