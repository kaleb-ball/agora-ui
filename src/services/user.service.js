import {restService} from "./rest.service";

export const userService = {
    userInvites,
    userDetails,
    getAllUsers
}

const endpointBase = "users"
const user = "me"

export function userInvites (sent) {
    const endpoint = `${endpointBase}/${user}/invites`
    const params = {
        type : sent ? 'sent' : 'received'
    }
    return restService.get(endpoint, true, params)

}

export function userDetails() {
    const endpoint = `${endpointBase}/${user}`
    return restService.get(endpointBase, true)
}

export function getAllUsers() {
    return restService.get(endpointBase, true)
}