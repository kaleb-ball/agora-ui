import {restService} from "./rest.service";
import {add} from "date-fns";
import {userService} from "./user.service";
import {get_value_by_id} from "../constants/platformConstants";

export const meetingService = {
    createMeeting,
    getAllMeetings,
    getMeeting
}

const endpointBase = 'users/me/platforms'

function createMeeting(data, platform, instant) {
    const endpoint = getEndpoint(platform)
    const params = {
        type : instant ? 1 : 2
    }
    return restService.post(endpoint, true, data, params);
}

async function getAllMeetings(platforms) {
    let meetings = [];
    const platformsMap = platforms.map(x => x.name)
    for (const platform of platformsMap.keys()) {
        let platformMeetings = await getPlatformMeetings(platformsMap[platform])
        meetings = meetings.concat(platformMeetings)
    }
    meetings = await addSentInvites(meetings)
    let receivedInvitesMeetings = await addReceivedInvites()
    meetings = meetings.concat(receivedInvitesMeetings)
    meetings = removeNull(meetings);

    return meetings;
}


async function getPlatformMeetings(platform) {
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
        return newMeetings.data.next_page_token ? await getPagedMeetings(newMeetings.data.next_page_token) : addFields(meetings, platform);
    }
}


async function addSentInvites(meetings) {
    let sentInvites =  (await userService.userInvites(true)).data
    meetings.forEach(
        (meeting) => {
            if (meeting) {
                meeting.participants = [];
                meeting.isHost = true;
                let meetingInvites = sentInvites ? sentInvites.filter(invite => invite.meeting.id === meeting.id) : []
                if (meetingInvites.length > 0) {
                    meetingInvites.forEach(
                        invite => {
                            invite.invitee.inviteId = invite.id
                            meeting.participants.push(invite.invitee)
                        })
                }
            }})
    return meetings
}

async function addReceivedInvites() {
    let meetings = [];
    let receivedInvites = (await userService.userInvites(false)).data
    if (receivedInvites) {
        receivedInvites.forEach(
            invite => {
                invite.meeting.isHost = false;
                invite.meeting.hostId = invite.inviter_id
                invite.meeting.platform = get_value_by_id(invite.meeting_platform)
                meetings.push(invite.meeting)
            }
        )
    }
    addDates(meetings)
    return meetings;
}


function getMeeting(id, platform) {
    const endpoint = `${getEndpoint(platform)}/${id}`;
    return restService.get(endpoint,true)
}


function getEndpoint(platform) {
   return `${endpointBase}/${platform}/meetings`;
}

function addFields(meetings, platform) {
    addPlatform(meetings, platform)
    addDates(meetings)
}

function removeNull(meetings) {
    return meetings.filter(meeting => meeting )
}

function addPlatform(meetings, platform) {
    meetings.forEach(meeting => {if (meeting) meeting.platform = platform})
}

function addDates(meetings) {
    meetings.forEach(meeting => {
        if (meeting) {
            meeting.start_time = new Date(meeting.start_time)
            meeting.end_time = add(new Date(meeting.start_time), {minutes:meeting.duration})
        }
    })
}