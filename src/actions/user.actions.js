import { userConstants } from '../constants';
import { userService } from '../services';
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
                history.push('/serviceAuth');
            },
            error => {
                dispatch(failure(error.toString()))
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
                    history.push('/login');
                    //dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type : userConstants.LOGOUT }
}