import {meetingConstants} from "../constants/meetingConstants";

export function createMeeting(state = {}, action) {
    switch (action.type) {
        case meetingConstants.CREATE_REQUEST:
            return {};
        case meetingConstants.CREATE_SUCCESS:
            return {};
        case meetingConstants.CREATE_FAILURE:
            return {};
        default:
            return state
    }
}