import {userConstants} from "../constants";

export function getAllUsers(state={ users : [] }, action) {
    switch (action.type) {
        case userConstants.GET_USERS_REQUEST : {
            return {}
        }
        case userConstants.GET_USERS_SUCCESS : {
            return {
                users : action.users
            }
        }
        case userConstants.GET_USERS_FAILURE :
            return {}
        default :
            return state
    }
}