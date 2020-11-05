// TBD document functions

export function getDateObjects(departureDateString, returnDateString) {

    const departureDate = new Date(departureDateString);
    const returnDate = new Date(returnDateString);
    const now = new Date();
    now.setHours(0, 0, 0);

    return { now, departureDate, returnDate };

}

function getDatesDelta(date1, date2) {
    return Math.floor((date1 - date2) / (86400 * 1000)) + 1;
}

export function getCountdown(departureDateString, returnDateString) {

    const dateObjects = getDateObjects(departureDateString, returnDateString);

    return getDatesDelta(dateObjects.departureDate, dateObjects.now);
}

export function getTripDuration(departureDateString, returnDateString) {

    const dateObjects = getDateObjects(departureDateString, returnDateString);

    return getDatesDelta(dateObjects.returnDate, dateObjects.departureDate);
}