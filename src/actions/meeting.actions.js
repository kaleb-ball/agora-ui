import {meetingService} from "../services";
import {alertActions} from "./alert.actions";
import {meetingConstants} from "../constants";

export const meetingActions = {
    createMeeting,
    createInstantMeeting,
    getMeetings,
    startMeeting
}

function createMeeting(data, platform) {
    return dispatch => {
        dispatch(request());
        meetingService.createMeeting(data, platform, false).then(
            () => {
                dispatch(success());
                dispatch(alertActions.success("Successfully Created a Meeting"))
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

function startMeeting(id) {
    return dispatch => {
        dispatch(request());
        meetingService.getMeeting(id).then(
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