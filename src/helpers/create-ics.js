import {createEvent} from "ics";
import {getYear, getDate, getMonth, getMinutes, getHours, differenceInMinutes} from 'date-fns'

/**
 * Creates an ics event (iCal Meeting) and downloads it
 * @param meeting - fully formed meeting object
 */
export function createICS(meeting) {
    const {error, value} = createEvent({
        title: meeting.title,
        description : meeting.description,
        start : [getYear(meeting.start_time), getMonth(meeting.start_time) + 1, getDate(meeting.start_time), getHours(meeting.start_time), getMinutes(meeting.start_time)],
        duration : { minutes: differenceInMinutes(meeting.start_time, meeting.end_time)} ,
        url : meeting.join_url
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