import {oauthConstants} from "../constants";

export function authorization(state = {}, action) {
    switch (action.type) {
        case oauthConstants.AUTHORIZATION_REQUEST:
            return {};
        case oauthConstants.AUTHORIZATION_SUCCESS:
            return {};
        case oauthConstants.AUTHORIZATION_FAILURE:
            return {};
        default:
            return state
    }
}

export function access(state = {}, action) {
    switch (action.type) {
        case oauthConstants.ACCESS_REQUEST:
            return {};
        case oauthConstants.ACCESS_SUCCESS:
            return {};
        case oauthConstants.ACCESS_FAILURE:
            return {};
        default:
            return state
    }
}