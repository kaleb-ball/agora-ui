import { userConstants } from "../constants";

let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
const initialState = user ? { loggedIn: true, user} : {loggedIn: false};

export function authentication (state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggedIn : false,
                user : action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user : action.user
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