import {createEvent} from "ics";
import {getYear, getDate, getMonth, getMinutes, getHours, differenceInMinutes} from 'date-fns'
import {writeFileSync} from "fs";

export function createICS(meeting) {
    let dateTime = meeting.start_time
    let attendees = [];
    meeting.participants.forEach(
        (participant) => {
            attendees.push({name : participant.firstname + ' ' + participant.lastname})
    })
    const {error, value} = createEvent({
        title: meeting.title,
        description : meeting.description,
        start : [getYear(dateTime), getMonth(dateTime) + 1, getDate(dateTime), getHours(dateTime), getMinutes(dateTime)],
        duration : { minutes: differenceInMinutes(meeting.start_time, meeting.end_time)} ,
        url : meeting.join_url,
        attendees : attendees
    })

    if(error) {
        console.log(error)
    }

    download("meeting.ics", value)

}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}