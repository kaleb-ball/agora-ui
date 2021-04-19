import {alertConstants, userConstants} from '../constants';
import {oauthService, authService} from '../services';
import { alertActions } from './';
import { history } from '../helpers';
import {userService} from "../services/user.service";


export const userActions = {
    login,
    logout,
    register
};

function login(username, password) {
    return dispatch => {
        dispatch(request({username}));
        authService.login(username, password).then(
            user => {
                dispatch(success(user));
                userService.userDetails().then(res => localStorage.setItem('user', JSON.stringify(res.data)))
                oauthService.isAuthorized().then(
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
                dispatch(alertActions.error(error.response.data.error.toString()))
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

        authService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/auth');
                    dispatch(alertActions.success('Registration successful', alertConstants));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.response.data.error.toString(), alertConstants));
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
        authService.logout()
    }
    function logout() {return {type : userConstants.LOGOUT}}
}
