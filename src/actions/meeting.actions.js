import {meetingService} from "../services";
import {alertActions} from "./alert.actions";
import {alertConstants, meetingConstants} from "../constants";

export const meetingActions = {
    createMeeting,
    createInstantMeeting
}

function createMeeting(data) {
    return dispatch => {
        dispatch(request());
        meetingService.createMeeting(data, false).then(
            (meeting) => {
                console.log(meeting);
                dispatch(success());
                dispatch(alertActions.success("Successfully Created a Meeting"), alertConstants.ALERT_LENGTH)
            },
            (error)=>{
                dispatch(failure())
                dispatch(alertActions.error(error.response.data.error.toString(), alertConstants.ALERT_LENGTH))
            })
    }
    function request() { return {type: meetingConstants.CREATE_REQUEST} }
    function success() { return {type: meetingConstants.CREATE_SUCCESS} }
    function failure() { return {type: meetingConstants.CREATE_FAILURE} }
}

function createInstantMeeting (data) {
    return dispatch => {
        dispatch(request());
        meetingService.createMeeting(data, true).then(
            (body) => {
                dispatch(success());
                console.log(body.data.start_url)
                if(body.data.start_url) {
                    const newWindow = window.open(body.data.start_url, "_blank", "noopener,noreferrer")
                    if (newWindow) newWindow.opener = null

                }
            },
            (error)=>{
                dispatch(failure())
                dispatch(alertActions.error(error.response.data.error.toString(), alertConstants.ALERT_LENGTH))
            })
    }
    function request() { return {type: meetingConstants.CREATE_REQUEST} }
    function success() { return {type: meetingConstants.CREATE_SUCCESS} }
    function failure() { return {type: meetingConstants.CREATE_FAILURE} }
}