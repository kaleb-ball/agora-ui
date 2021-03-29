const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



export const dateHelper  = {
    getDayOfWeek,
    getMonthOfYear
}

function getDayOfWeek(date) {
    return days[date.getDay()];
}

function getMonthOfYear(date) {
    return months[date.getMonth()]
}
