import {restService} from "./rest.service";

export const inviteService = {
    createInvite,
    getInvite,
    deleteInvite,
}

const endpointBase = "invites"

/**
 * Creates an invite in the API
 *
 * @param invite - object with information about the invite.
 */
export function createInvite(invite) {
    return restService.post(endpointBase, true, invite)
}

/**
 * Retrieves information about a single invite including inviter, invitee, and meeting id.
 *
 * @param id - invite id
 */
export function getInvite(id) {
    const endpoint = `${endpointBase}/${id}`
    return restService.get(endpoint, true)
}

/**
 * Deletes an invite in API
 *
 * @param id - invite id
 */
export function deleteInvite(id) {
    const endpoint = `${endpointBase}/${id}`
    return restService.delete(endpoint, true)
}
