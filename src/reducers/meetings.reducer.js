import {meetingConstants} from "../constants";

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

export function getMeetings(state = {requestingMeetings : false, meetings : []}, action) {
    switch(action.type) {
        case meetingConstants.GET_MEETINGS_REQUEST :
            return {requestingMeetings : true};
        case meetingConstants.GET_MEETINGS_SUCCESS :
            return {
                requestingMeetings: false,
                meetings : action.meetings
            };
        case meetingConstants.GET_MEETINGS_FAILURE :
            return {requestingMeetings: false}
        default :
            return state;
    }
}

export function getMeeting(state = {}, action) {
    switch(action.type) {
        case meetingConstants.GET_MEETINGS_REQUEST :
            return {};
        case meetingConstants.GET_MEETINGS_SUCCESS :
            return {};
        case meetingConstants.GET_MEETINGS_FAILURE :
            return {}
        default :
            return state;
    }
}