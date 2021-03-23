import {restService} from "./rest.service";
import {oauthConstants} from "../constants";

export const meetingService = {
    createMeeting
}

const endpointBase = 'users/me/platforms/'

function createMeeting(data, instant) {
    let endpoint = endpointBase + oauthConstants.ZOOM + '/meetings'
    if (instant) {
        endpoint += '?type=1'
    } else {
        endpoint += '?type=2'
    }
    return restService.post(endpoint, data, true);
}