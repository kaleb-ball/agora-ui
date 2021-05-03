import {meetingService} from "../services";
import {alertActions} from "./alert.actions";
import {meetingConstants} from "../constants";
import {inviteAction} from "./invite.actions";
import {inviteService} from "../services/invite.service";

export const meetingActions = {
    createMeeting,
    createInstantMeeting,
    startMeeting,
    joinMeeting,
    deleteMeeting,
    getMeetings,
    addParticipant,
    deleteParticipant,
}

/**
 * Creates a meeting using meetingService
 *
 * @param data - meeting object
 * @param platform - meeting platform
 * @param invites - optional array of invites
 */
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

/**
 * Deletes meeting using meetingService
 *
 * @param id - meeting id
 * @param platform - meeting platform
 */
function deleteMeeting(id, platform) {
    return dispatch => {
        meetingService.deleteMeeting(id, platform).then(
            () => {
                dispatch(success(id))
            }
        ).catch(
            () => {
                dispatch(alertActions.error("There was a problem deleting the meeting"))
            }
        )
    }

    function success(id) {return {type: meetingConstants.DELETE_MEETING, id}}
}

/**
 *  * Creates an instant meeting using meetingService
 *
 * @param data - meeting object
 * @param platform - meeting platform
 */
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

/**
 * Gets all meetings for a user and then updates the global state
 *
 * @param platforms - array of platforms to get meetings from
 */
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

function joinMeeting(meeting) {
    return dispatch => {
        if (meeting) {
            openUrl(meeting.join_url)
        }
    }
}

/**
 * Retrieves start_url for meeting and then starts the meeting for the host.
 *
 * @param id - meeting id
 * @param platform - meeting platform
 */
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
        openUrl(body.data.start_url)
    }
}

function openUrl(url) {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer")
    if (newWindow) newWindow.opener = null
}

/**
 * Adds participant to meeting in the global state from the invite id.
 *
 * @param id - invite id
 */
function addParticipant(id) {
    return dispatch => {
        inviteService.getInvite(id).then(
            (res) => {
                let invite = res.data
                dispatch(add(invite))
            }
        )
    }
    function add(invite) {return {type : meetingConstants.ADD_PARTICIPANT, invite}}
}

/**
 * Removes participant from meeting in the global state based on invite id
 *
 * @param id - invite id
 */
function deleteParticipant(id) {
    return dispatch => {
        dispatch(_delete(id))
    }
    function _delete(id) {return {type : meetingConstants.DELETE_PARTICIPANT, id}}
}
