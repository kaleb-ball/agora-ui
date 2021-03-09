import {meetingService} from "../services";
import {alertActions} from "./alert.actions";
import {alertConstants, meetingConstants} from "../constants";

export const meetingActions = {
    createMeeting
}

function createMeeting(data) {
    return dispatch => {
        dispatch(request());
        console.log("Creating Meeting...")
        meetingService.createMeeting(data).then(
            (meeting) => {
                console.log(meeting)
                dispatch(success())
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