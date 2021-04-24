export const userConstants = {

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    LOGOUT: 'USERS_LOGOUT',

    GET_USERS_REQUEST : 'GET_USERS_REQUEST',
    GET_USERS_SUCCESS : 'GET_USERS_SUCCESS',
    GET_USERS_FAILURE : 'GET_USERS_FAILURE'

}

export function get_user_id() {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : ''
}

export function get_username() {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : ''
}