export async function processForm(event) {

    // Prevent the page from reloading when clicking the button
    event.preventDefault();

    // Getting data from input boxes
    const city = document.getElementById('input-city').value;
    const departureDateString = document.getElementById('input-departure-date').value;
    const returnDateString = document.getElementById('input-return-date').value;

    // Validate data
    const isValidInput = validateInput(city, departureDateString, returnDateString);

    // Exit form processing on invalid input
    if (!isValidInput) {
        return;
    }

    // Update UI - show the results section
    document.getElementById('results').classList.remove('hide');

    // Update UI - Countdown section
    Client.updateCountdownUI(departureDateString, returnDateString);

    // Get the weather history before making the weather API call
    // If within 1 week, this weatherHistory object will return empty strings for the API call (for a forecast call)
    // Else, the weatherHistory object returns string start/end dates  (for a historical call)
    const weatherHistory = getWeatherHistoryDates(departureDateString, returnDateString);

    // Getting the weather API (via geonames API)
    const weatherAPI = await Client.getGeonamesData(city).then(function (geonamesData) {
        return Client.getWeatherBitData(geonamesData.geonames[0].lat, geonamesData.geonames[0].lng, weatherHistory.StartDateString, weatherHistory.EndDateString);
    });

    const weatherData = Client.extractWeatherData(weatherAPI, weatherHistory.StartDateString, weatherHistory.EndDateString);

    // REST Countries API
    const countryAPI = await Client.getRestCountryData(weatherData[0].countryCode);
    const countryData = Client.extractRestCountryData(countryAPI);

    // Update UI - City/country section
    Client.updateCityCountryUI(weatherData, countryData);

    // Update UI - Weather section
    Client.updateWeatherUI(weatherData, departureDateString, returnDateString);

    // Pixabay API
    const picData = await Client.extractPicData(weatherData, countryData);

    // Update UI - Pic
    Client.updatePicUI(picData);
}

export function validateInput(city, departureDateString, returnDateString) {

    if (city === '') {
        alert('Please enter a city.')
        return false;
    }

    if (departureDateString === '') {
        alert('Please enter a departure date.')
        return false;
    }

    if (returnDateString === '') {
        alert('Please enter a return date.')
        return false;
    }

    const dateObjects = Client.getDateObjects(departureDateString, returnDateString);

    if (dateObjects.returnDate < dateObjects.departureDate) {
        alert('Please enter a return date that is after the departure date.')
        return false;
    }

    if (dateObjects.now > dateObjects.departureDate) {
        alert('Please enter a departure date that is after the current date.')
        return false;
    }

    return true;
}

function getWeatherHistoryDates(departureDateString, returnDateString) {

    // If these remain empty strings, then fetching/using forecast data rather than historical data
    let StartDateString = '';
    let EndDateString = '';

    const countdownDaysToTrip = Client.getCountdown(departureDateString, returnDateString);

    // If more than 7 days to the trip, grab historical weather data
    if (countdownDaysToTrip > 7) {

        // Get current date, departure/return date as Date objects
        const dateObjects = Client.getDateObjects(departureDateString, returnDateString);

        // Create a history start date, using the previous year from now
        const historyStartDate = new Date(dateObjects.now.getFullYear() - 1, dateObjects.departureDate.getMonth(), dateObjects.departureDate.getDate());
        StartDateString = historyStartDate.toISOString().split('T')[0];

        // End date is one day after start date (limitation of API key)
        let historyEndDate = new Date(historyStartDate.getTime());
        historyEndDate.setDate(historyEndDate.getDate() + 1);
        EndDateString = historyEndDate.toISOString().split('T')[0];
    }

    return { StartDateString, EndDateString };
}