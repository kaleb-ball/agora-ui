import {alertConstants, userConstants} from '../constants';
import {oauthService, userService} from '../services';
import { alertActions } from './';
import { history } from '../helpers';


export const userActions = {
    login,
    logout,
    register
};

function login(username, password) {
    return dispatch => {
        dispatch(request({username}));
        userService.login(username, password).then(
            user => {
                dispatch(success(user));
                oauthService.isAuthenticated().then(
                    res => {
                        if (res) {
                            history.push("/home")
                        } else {
                            history.push("/oauth")
                        }
                    }
                )
            },
            error => {
                dispatch(failure(error.toString()))
                dispatch(alertActions.error(error.response.data.error.toString(), alertConstants.ALERT_LENGTH))
            }
        );
    };

    function request(user) { return {type: userConstants.LOGIN_REQUEST, user} }
    function success(user) { return {type: userConstants.LOGIN_SUCCESS, user} }
    function failure(error) { return {type: userConstants.LOGIN_FAILURE, error} }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/auth');
                    dispatch(alertActions.success('Registration successful', alertConstants.ALERT_LENGTH));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.response.data.error.toString(), alertConstants.ALERT_LENGTH));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function logout() {
    return dispatch => {
        dispatch(logout())
        userService.logout()
    }
    function logout() {return {type : userConstants.LOGOUT}}
}
