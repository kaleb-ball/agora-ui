import {meetingConstants} from "../constants";
import {act} from "@testing-library/react";

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
    let meetings;
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
        case meetingConstants.ADD_PARTICIPANT :
            meetings = state.meetings.forEach(meeting => {
                if (action.invite.meeting_id === meeting.id) meeting.participants.push(action.invite)
            })
            return {meetings : meetings}
        case meetingConstants.DELETE_PARTICIPANT :
            meetings = state.meetings.forEach(meeting => meeting.participants.filter(participant => participant.invite.inviteId !== action.id))
            return {meetings : meetings}
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
