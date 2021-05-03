import {inviteConstants} from "../constants/inviteConstants";
import {inviteService} from "../services/invite.service";
import {alertActions} from "./alert.actions";
import {meetingActions} from "./meeting.actions";

export const inviteAction = {
    createInvite,
    deleteInvite
}

/**
 * Creates invite in API and then dispatches meetingAction to change the global state
 * @param invite - invitation object
 */
export function createInvite(invite) {
    return dispatch => {
        dispatch(request());
        inviteService.createInvite(invite).then(
            (res) => {
                dispatch(success());
                dispatch(meetingActions.addParticipant(res.data.id))
            }
        ).catch(
            (err) => {
                dispatch(failure());
                dispatch(alertActions.error('Something went wrong creating invites'))
            }
        )
    }
    function request() { return {type : inviteConstants.CREATE_REQUEST}}
    function success() { return {type : inviteConstants.CREATE_SUCCESS}}
    function failure() { return {type : inviteConstants.CREATE_FAILURE}}

}
/**
 * Deletes invite in API and then dispatches meetingAction to change the global state
 * @param id - invitation id
 */
export function deleteInvite(id) {
    return dispatch => {
        dispatch(request())
        inviteService.deleteInvite(id).then(
            () => {
                dispatch(success())
                dispatch(meetingActions.deleteParticipant(id))
            }
        ).catch(
            (err) => {
                dispatch(failure())
                dispatch(alertActions.error("Something went wrong deleting the invite"))
            }
        )
    }
    function request() { return {type : inviteConstants.DELETE_REQUEST}}
    function success() { return {type : inviteConstants.DELETE_SUCCESS}}
    function failure() { return {type : inviteConstants.DELETE_FAILURE}}
}
