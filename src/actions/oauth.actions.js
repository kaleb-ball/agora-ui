import {oauthService} from "../services";
import {alertConstants, oauthConstants} from "../constants";
import {alertActions} from "./alert.actions";
import {history} from "../helpers";

export const oauthActions = {
    getAuthorization,
    getAccessToken,
    revokeAccess
}

function getAuthorization(serviceName) {
    return dispatch => {
        dispatch(request())
        oauthService.getUrl(serviceName).then(
            url => {
                dispatch(success())
                console.log(localStorage.getItem("nonce"))
                window.location.href = url;
                dispatch(success())
            },
            error => {
                dispatch(failure(error.toString()))
                dispatch(alertActions.error("Authorization with " +
                    serviceName.charAt(0).toUpperCase() + serviceName.slice(1) + '' + " not available", alertConstants.ALERT_LENGTH))
            })
    }
    function request() { return {type: oauthConstants.AUTHORIZATION_REQUEST} }
    function success() { return {type: oauthConstants.AUTHORIZATION_SUCCESS} }
    function failure() { return {type: oauthConstants.AUTHORIZATION_FAILURE} }
}

function getAccessToken(serviceName, state, code) {
    return dispatch => {
        dispatch(request())
        if (state === localStorage.getItem("nonce")) {
            oauthService.getAccessToken(serviceName, code).then(
                res => {
                    dispatch(success())
                    dispatch(alertActions.success("Successfully Linked Account", alertConstants.ALERT_LENGTH))
                    dispatch(success())
                    history.push("/home")
                })
                .catch(
                    error =>{
                        dispatch(failure())
                        dispatch(alertActions.error(error.response.data.error.toString(), alertConstants.ALERT_LENGTH))
                        history.push("/login")
            })
        } else {
            dispatch(failure());
            dispatch(alertActions.error("Something went wrong. Please try again."), alertConstants.ALERT_LENGTH)
            history.push("/login")
        }
    }
    function request() { return {type: oauthConstants.ACCESS_REQUEST} }
    function success() { return {type: oauthConstants.ACCESS_SUCCESS} }
    function failure() { return {type: oauthConstants.ACCESS_FAILURE} }
}

function revokeAccess(serviceName) {

}