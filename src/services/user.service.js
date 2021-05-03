import {restService} from "./rest.service";

export const userService = {
    userInvites,
    userDetails,
    getUsers
}

const endpointBase = "users"
const user = "me"


/**
 * Return all a user's sent or received invites
 * @param sent {boolean} - search for sent invites
 */
export function userInvites (sent) {
    const endpoint = `${endpointBase}/${user}/invites`
    const params = {
        type : sent ? 'sent' : 'received'
    }
    return restService.get(endpoint, true, params)

}

/**
 * Retrieves information about a user. Only details about the logged in user can currently be retrieved.
 */
export function userDetails() {
    const endpoint = `${endpointBase}/${user}`
    return restService.get(endpoint, true)
}

export function getUsers() {
    return restService.get(`${endpointBase}`, true)
}
