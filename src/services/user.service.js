import {restService} from "./rest.service";

export const userService = {
    userInvites,
    userDetails
}

const endpointBase = "users/me"

export function userInvites (sent) {
    const endpoint = `${endpointBase}/invites`
    const params = {
        type : sent ? 'sent' : 'received'
    }
    return restService.get(endpoint, true, params)

}

export function userDetails() {
    return restService.get(endpointBase, true)
}