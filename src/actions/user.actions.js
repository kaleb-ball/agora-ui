import {alertConstants, get_username, userConstants} from '../constants';
import {oauthService, authService} from '../services';
import { alertActions } from './';
import { history } from '../helpers';
import {userService} from "../services/user.service";


export const userActions = {
    login,
    logout,
    register,
    getAllUsers
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


function getAllUsers() {
    return dispatch => {
        dispatch(request())
        userService.getUsers().then(
            (res) => {
                let users = res.data
                users = users.filter(user => user.username !== get_username())
                dispatch(success(users))
            }
        ).catch(
            (err) => {
                dispatch(failure())
                dispatch(alertActions.error('Something went wrong getting users'))
            }
        )
    }
    function request() { return { type: userConstants.GET_USERS_REQUEST} }
    function success(users) { return { type: userConstants.GET_USERS_SUCCESS, users } }
    function failure() { return { type: userConstants.GET_USERS_FAILURE } }
}