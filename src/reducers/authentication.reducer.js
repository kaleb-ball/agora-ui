import { userConstants } from "../constants";

let token = localStorage.getItem('auth-token') ? JSON.parse(localStorage.getItem('auth-token')) : '';
const initialState = token ? { loggedIn: true} : {loggedIn: false};

export function authentication (state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggedIn : false
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true
            }
        case userConstants.LOGIN_FAILURE:
            return {
                loggedIn: false
            };
        case userConstants.LOGOUT:
            return {
                loggedIn : false
            };
        default:
            return state;
    }
}