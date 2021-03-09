import {restService} from "./rest.service";
import {oauthConstants} from "../constants";

export const meetingService = {
    createMeeting
}

const endpointBase = 'users/me/'

function createMeeting(data) {
    let endpoint = endpointBase + oauthConstants.ZOOM + '/meetings'
    return restService.post(endpoint, data, true);
}