import {inviteConstants} from "../constants/inviteConstants";
import {inviteService} from "../services/invite.service";
import {alertActions} from "./alert.actions";

export const inviteAction = {
    createInvite,
    deleteInvite,
    getUserInvites
}

export function createInvite(invite) {
    return dispatch => {
        dispatch(request());
        inviteService.createInvite(invite).then(
            () => {
                dispatch(success());
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

export function deleteInvite() {

}

export function getUserInvites() {

}