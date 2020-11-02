export async function processForm(event) {

    // Prevent the page from reloading when clicking the button
    event.preventDefault();






    // Getting data from input boxes
    const city = document.getElementById('input-city').value;
    const departureDateString = document.getElementById('input-departure-date').value;
    const returnDateString = document.getElementById('input-return-date').value;

    if (city === '') {
        alert('Please enter a city.')
        return;
    }

    if (departureDateString === '') {
        alert('Please enter a departure date.')
        return;
    }

    if (returnDateString === '') {
        alert('Please enter a return date.')
        return;
    }





    // Setting countdown/duration info UI
    const countdownDaysToTrip = Client.getCountdown(departureDateString, returnDateString);
    const tripDuration = Client.getTripDuration(departureDateString, returnDateString);

    document.getElementById('countdown').innerHTML = `<h2>Trip Information</h2>
                                                      <strong>Start date:</strong> ${departureDateString}<br>
                                                      <strong>End date:</strong> ${returnDateString}<br>
                                                      <strong>Number of days to the trip:</strong> ${countdownDaysToTrip} days.<br>
                                                      <strong>Trip duration:</strong> ${tripDuration} days.`;










    // If these are empty strings, then fetching/using forecast data rather than historical data
    let weatherHistoryStartDateString = '';
    let weatherHistoryEndDateString = '';

    // If more than 7 days to the trip, grab historical weather data
    if (countdownDaysToTrip > 7) {

        // Get current date, departure/return date as Date objects
        const dateObjects = Client.getDateObjects(departureDateString, returnDateString);

        // Create a history start date, using the previous year from now
        const historyStartDate = new Date(dateObjects.now.getFullYear() - 1, dateObjects.departureDate.getMonth(), dateObjects.departureDate.getDate());
        weatherHistoryStartDateString = historyStartDate.toISOString().split('T')[0];

        // End date is one day after start date (limitation of API key)
        let historyEndDate = new Date(historyStartDate.getTime());
        historyEndDate.setDate(historyEndDate.getDate() + 1);
        weatherHistoryEndDateString = historyEndDate.toISOString().split('T')[0];
    }


    // Getting the weather API (via geonames API)
    const weatherAPI = await Client.getGeonamesData(city).then(function (geonamesData) {
        return Client.getWeatherBitData(geonamesData.geonames[0].lat, geonamesData.geonames[0].lng, weatherHistoryStartDateString, weatherHistoryEndDateString);
    });

    const weatherData = Client.extractWeatherData(weatherAPI, weatherHistoryStartDateString, weatherHistoryEndDateString);

    // City/country UI
    document.getElementById('city-info').innerHTML = `<h2>Weather Results:</h2><br>
                                                      <strong>City:</strong> ${weatherData[0].cityName}<br>
                                                      <strong>Country:</strong> ${weatherData[0].countryCode}`;





    let innerHTMLWeather = ``;
    let iconUrl = ``;
    // Now update 7-day forecast UI if future
    // Otherwise single forecast if historical
    if (countdownDaysToTrip <= 7) {

        for (let i = countdownDaysToTrip; i < countdownDaysToTrip + 7; i++) {

            iconUrl = `https://www.weatherbit.io/static/img/icons/${weatherData[i].icon}.png`;

            innerHTMLWeather += `<div id="day${i}" class="weather-cell">
                                 <p>${weatherData[i].date}</p>
                                 <img src="${iconUrl}" alt="${weatherData[i].description}">
                                 <p>${weatherData[i].description}</p>
                                 <strong>High:</strong> ${weatherData[i].highTemp} °C<br>
                                 <strong>Low:</strong> ${weatherData[i].lowTemp} °C<br>
                                 <strong>POP:</strong> ${weatherData[i].precipitation}%<br>
                                 <strong>Humidity:</strong> ${weatherData[i].humidity}%
                             </div>`;
        }
    }
    else {

        // TBD month number to text string (don't hardcode December)
        innerHTMLWeather += `<div id="day0" class="weather-history">
                             <h2>Typical weather for December:</h2>
                             <strong>High:</strong> ${weatherData[0].highTemp} °C<br>
                             <strong>Low:</strong> ${weatherData[0].lowTemp} °C<br>
                             <strong>POP:</strong> ${weatherData[0].precipitation}%<br>
                             <strong>Humidity:</strong> ${weatherData[0].humidity}%
                         </div>`;
    }

    document.getElementById('weather-info').innerHTML = innerHTMLWeather;











    const picAPI = await Client.getPixabayData(city);
    const picUrl = Client.extractPixabayPhotoUrl(picAPI);
    console.log(picUrl);

    // TBD if no photo chosen/available, try getting a photo for the country

    // Update pic UI
    document.getElementById('pixabay-pic').innerHTML = `<img src="${picUrl}" alt="${weatherData[0].cityName}">`;

    // TBD Could this object be used to add more locations?
    // Create an array on the local server, push/POST this there
    const allData = { weatherData, picUrl };



    // TBD Update UI based on API fetches
    // Hotel/fight info
    // Packing list/notes
    // Using LocalStorage


}