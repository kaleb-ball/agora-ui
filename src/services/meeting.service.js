import {restService} from "./rest.service";
import {oauthConstants} from "../constants";

export const meetingService = {
    createMeeting,
    getAllMeetings,
    getMeeting
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

async function getAllMeetings() {
    let meetings = [];
    await getPagedMeetings(null);
    return meetings;

     async function getPagedMeetings(page) {
        let endpoint = endpointBase + oauthConstants.ZOOM + '/meetings?page_size=50';
        let newMeetings;
        if (page) endpoint += "&next_page="+page
        await restService.get(endpoint, '',  true).then((res)=> {newMeetings = res;});
        meetings = meetings.concat(newMeetings.data.meetings)
        return newMeetings.data.next_page_token ? await getPagedMeetings(newMeetings.data.next_page_token) : meetings;
     }
}


function getMeeting(id) {
    let endpoint = endpointBase + oauthConstants.ZOOM + '/meetings/' + id;
    return restService.get(endpoint, null, true)
}
