/*
* Helper function that converts YYYY-MM-DD JS strings to JS Date() objects
* @param {String} departureDateString - Departure date as YYYY-MM-DD
* @param {String} returnDateString - Return date as YYYY-MM-DD
* @return {Object} - 3 date objects: the current date (now), departure date as a Date() and return date as a Date()
*/
export function getDateObjects(departureDateString, returnDateString) {

    const departureDate = new Date(departureDateString);
    const returnDate = new Date(returnDateString);
    const now = new Date();
    now.setHours(0, 0, 0);

    return { now, departureDate, returnDate };
}

/*
* Helper function that gets the difference between 2 dates (in days)
* @param {Date} date1 - Departure date as Date()
* @param {Date} date2 - Return date as as Date()
* @return {Number} - The number of days difference between date1 and date2 in days
*/
function getDatesDelta(date1, date2) {
    return Math.floor((date1 - date2) / (86400 * 1000)) + 1;
}

/*
* Helper function that returns the countdown between now and the departure date
* @param {String} departureDateString - Departure date as YYYY-MM-DD
* @param {String} returnDateString - Return date as YYYY-MM-DD
* @return {Number} - The number of days to countdown to the trip
*/
export function getCountdown(departureDateString, returnDateString) {

    const dateObjects = getDateObjects(departureDateString, returnDateString);

    return getDatesDelta(dateObjects.departureDate, dateObjects.now);
}

/*
* Helper function that returns the duration of the trip (difference between departure date and end date)
* @param {String} departureDateString - Departure date as YYYY-MM-DD
* @param {String} returnDateString - Return date as YYYY-MM-DD
* @return {Number} - The duration of the trip in days
*/
export function getTripDuration(departureDateString, returnDateString) {

    const dateObjects = getDateObjects(departureDateString, returnDateString);

    return getDatesDelta(dateObjects.returnDate, dateObjects.departureDate);
}