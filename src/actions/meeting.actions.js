import {meetingService} from "../services";
import {alertActions} from "./alert.actions";
import {meetingConstants} from "../constants";
import {inviteAction} from "./invite.actions";

export const meetingActions = {
    createMeeting,
    createInstantMeeting,
    getMeetings,
    startMeeting,
    addParticipant,
    deleteParticipant
}

function createMeeting(data, platform, invites = []) {
    return dispatch => {
        dispatch(request());
        meetingService.createMeeting(data, platform, false).then(
            (meeting) => {
                dispatch(success());
                dispatch(alertActions.success("Successfully Created a Meeting"))
                if (invites) {
                    invites.forEach(invite => {
                        invite.meeting_id = meeting.data.id
                        dispatch(inviteAction.createInvite(invite))
                    })
                }
            },
            (error)=>{
                dispatch(failure())
                dispatch(alertActions.error(error.response.data.error.toString()))
            })
    }
    function request() { return {type: meetingConstants.CREATE_REQUEST} }
    function success() { return {type: meetingConstants.CREATE_SUCCESS} }
    function failure() { return {type: meetingConstants.CREATE_FAILURE} }
}

function createInstantMeeting(data, platform) {
    return dispatch => {
        dispatch(request());
        meetingService.createMeeting(data, platform, true).then(
            (body) => {
                dispatch(success());
                openStartUrl(body)
            },
            (error)=>{
                dispatch(failure())
                dispatch(alertActions.error(error.response.data.error.toString()))
            })
    }
    function request() { return {type: meetingConstants.CREATE_REQUEST} }
    function success() { return {type: meetingConstants.CREATE_SUCCESS} }
    function failure() { return {type: meetingConstants.CREATE_FAILURE} }
}

function getMeetings(platforms= {}) {
    return dispatch => {
        dispatch(request());
        meetingService.getAllMeetings(platforms).then(
            (res)=> {
                dispatch(success(res))
            }
        ).catch(
            (err)=> {
                dispatch(failure())
                dispatch(alertActions.error("There was an error getting meetings"))
            }
        )
    }
    function request() { return {type: meetingConstants.GET_MEETINGS_REQUEST} }
    function success(meetings) { return { type: meetingConstants.GET_MEETINGS_SUCCESS, meetings} }
    function failure() { return {type: meetingConstants.GET_MEETINGS_FAILURE} }
}

function startMeeting(id, platform) {
    return dispatch => {
        dispatch(request());
        meetingService.getMeeting(id, platform).then(
            (body) => {
                dispatch(success())
                openStartUrl(body)
            }
        ).catch(
            (error) => {
                dispatch(failure());
                dispatch(alertActions.error(error.response.data.error.toString()))
            }
        )
    }

    function request() { return {type: meetingConstants.GET_MEETING_REQUEST} }
    function success() { return { type: meetingConstants.GET_MEETING_SUCCESS} }
    function failure() { return {type: meetingConstants.GET_MEETING_FAILURE} }
}

function openStartUrl(body) {
    if(body.data.start_url) {
        const newWindow = window.open(body.data.start_url, "_blank", "noopener,noreferrer")
        if (newWindow) newWindow.opener = null
    }
}

function addParticipant(invite) {
    return dispatch => {
        dispatch(add(invite))
    }
    function add(invite) {return {type : meetingConstants.ADD_PARTICIPANT, invite}}
}

function deleteParticipant(id) {
    return dispatch => {
        dispatch(_delete(id))
    }
    function _delete(id) {return {type : meetingConstants.DELETE_PARTICIPANT, id}}
}
