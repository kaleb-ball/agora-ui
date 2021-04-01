import {restService} from "./rest.service";
import {oauthConstants} from "../constants";

export const meetingService = {
    createMeeting,
    getAllMeetings,
    getMeeting
}

const endpointBase = 'users/me/platforms'

function createMeeting(data, platform = oauthConstants.PLATFORM_NAMES.ZOOM, instant) {
    const endpoint = getEndpoint(platform)
    const params = {
        type : instant ? 1 : 2
    }
    return restService.post(endpoint, true, data, params);
}

async function getAllMeetings(platform= oauthConstants.PLATFORM_NAMES.ZOOM) {
    let meetings = [];
    await getPagedMeetings(null);
    return meetings;

     async function getPagedMeetings(page) {
        let newMeetings
        const endpoint = getEndpoint(platform)
        const params = {
            page_size : 50,
            next_page : page ? page : ''
        }
        await restService.get(endpoint, true, params).then((res)=> {newMeetings = res;});
        meetings = meetings.concat(newMeetings.data.meetings)
        return newMeetings.data.next_page_token ? await getPagedMeetings(newMeetings.data.next_page_token) : meetings;
     }
}


function getMeeting(id, platform = oauthConstants.PLATFORM_NAMES.ZOOM) {
    const endpoint = getEndpoint(platform);
    const params = {
        ID : id
    }
    return restService.get(endpoint,true, params)
}


function getEndpoint(platform) {
   return `${endpointBase}/${platform}/meetings`;
}