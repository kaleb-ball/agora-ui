import {isPast, isSameDay, isWithinInterval} from "date-fns";


export function removeTime(date) {
    return new Date(new Date(date).toLocaleDateString())
}

export function filterMeetingsByDateRange(meetings, startDate, endDate) {
    return meetings.filter(meeting => meeting && isWithinInterval(removeTime(meeting.start_time), {start : startDate, end : endDate}))
}

export function filterMeetingsByDate(meetings, date) {
    return meetings.filter((meeting) => meeting && isSameDay(removeTime(meeting.start_time), date))
}

export function filterTodayMeetings(meetings) {
    return filterMeetingsByDate(meetings, new Date()).filter((meeting) => meeting && !isPast(meeting.end_time))
}