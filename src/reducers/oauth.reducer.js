import {oauthConstants} from "../constants";
import {number_of_platforms} from "../constants/platformConstants";

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

export function checkAuthorization(state = {platforms : [], allAuthorized : false}, action) {
    switch (action.type) {
        case oauthConstants.CHECK_AUTHORIZATION:
            const allAuthorized = action.platforms.length === number_of_platforms()
            return {
                platforms : action.platforms,
                allAuthorized: allAuthorized
            };
        default :
            return state;
    }
}