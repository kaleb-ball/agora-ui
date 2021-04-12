import {oauthService} from "../services";
import {oauthConstants} from "../constants";
import {alertActions} from "./alert.actions";
import {history} from "../helpers";

export const oauthActions = {
    getAuthorization,
    getAccessToken,
    checkAuthorization,
    revokeAccess
}

function getAuthorization(serviceName) {
    return dispatch => {
        dispatch(request())
        oauthService.getUrl(serviceName).then(
            url => {
                dispatch(success())
                window.location.href = url;
                dispatch(success())
            },
            error => {
                dispatch(failure(error.toString()))
                dispatch(alertActions.error("Authorization with platform not available"))
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
                    dispatch(alertActions.success("Successfully Linked Account"))
                    history.push("/oauth")
                })
                .catch(
                    error =>{
                        dispatch(failure())
                        dispatch(alertActions.error(error.response.data.error.toString()))
                        history.push("/login")
            })
        } else {
            dispatch(failure());
            dispatch(alertActions.error("Something went wrong. Please try again."))
            history.push("/login")
        }
    }
    function request() { return {type: oauthConstants.ACCESS_REQUEST} }
    function success() { return {type: oauthConstants.ACCESS_SUCCESS} }
    function failure() { return {type: oauthConstants.ACCESS_FAILURE} }
}

function checkAuthorization() {
    return dispatch => {
        oauthService.authenticatedPlatforms().then(
            (platforms) => {
                dispatch(success(platforms))
            }
        ).catch(
            (err) => {
                dispatch(alertActions.error("Something went wrong"))
            }
        )
    }

    function success(platforms) { return {type: oauthConstants.CHECK_AUTHORIZATION, platforms} }
}
function revokeAccess(serviceName) {

}