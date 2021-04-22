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
        case meetingConstants.DELETE_MEETING:
            return {
                meetings: state.meetings.filter(meeting=> meeting.id !== action.id)
            }
        case meetingConstants.ADD_PARTICIPANT :
            state.meetings.forEach(meeting => {
                if (action.invite.meeting.id === meeting.id) {
                    let invitee = action.invite.invitee
                    invitee.inviteId = action.invite.id
                    meeting.participants.push(invitee)
                }
            })
            return {meetings : state.meetings}
        case meetingConstants.DELETE_PARTICIPANT :
            state.meetings.forEach(meeting => meeting.participants = meeting.participants.filter(participant => participant.inviteId !== action.id))
            return {meetings : state.meetings}
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
