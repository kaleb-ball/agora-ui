import {restService} from "./rest.service";

export const inviteService = {
    createInvite,
    deleteInvite,
}

const endpointBase = "invites"

export function createInvite(invite) {
    return restService.post(endpointBase, true, invite)
}

export function deleteInvite(id) {
    const endpoint = `${endpointBase}/${id}`
    return restService.delete(endpoint, true)
}