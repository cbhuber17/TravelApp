// TBD document functions

export function updateCountdownUI(departureDateString, returnDateString) {

    const countdownDaysToTrip = Client.getCountdown(departureDateString, returnDateString);
    const tripDuration = Client.getTripDuration(departureDateString, returnDateString);

    document.getElementById('countdown').innerHTML = `<h2>Trip Information</h2>
                                                      <img src="neonclock1.jpg" alt="Neon clock" width="250px" height="250px"><br>
                                                      <strong>Start date:</strong> ${departureDateString}<br>
                                                      <strong>End date:</strong> ${returnDateString}<br>
                                                      <strong>Number of days to the trip:</strong> ${countdownDaysToTrip} day(s).<br>
                                                      <strong>Trip duration:</strong> ${tripDuration} day(s).`;

}

export function updateCityCountryUI(weatherData, countryData) {
    document.getElementById('city-info').innerHTML = `<h2>Weather Results</h2>
                                                      <strong>City:</strong> ${weatherData[0].cityName}<br>
                                                      <strong>Belonging to country:</strong> ${countryData.countryName}<br>
                                                      <strong>Country Area:</strong> ${countryData.countryArea} sq km<br>
                                                      <strong>Country Population:</strong> ${countryData.countryPopulation}<br>
                                                      <img src="${countryData.countryFlagUrl}" alt="${countryData.countryName} flag" 
                                                      width="35%" height="25%">`;
}

export function updateWeatherUI(weatherData, departureDateString, returnDateString) {

    const countdownDaysToTrip = Client.getCountdown(departureDateString, returnDateString);
    const dateObjects = Client.getDateObjects(departureDateString, returnDateString);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const departureMonth = monthNames[dateObjects.departureDate.getMonth()];

    let innerHTMLWeather = ``;
    let iconUrl = ``;

    // Update 7-day forecast UI if within 1 week
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
    // Otherwise single forecast if historical
    else {
        innerHTMLWeather += `<div id="day0" class="weather-history">
                             <h2>Typical weather for ${weatherData[0].cityName} in ${departureMonth}</h2>
                             <strong>High:</strong> ${weatherData[0].highTemp} °C<br>
                             <strong>Low:</strong> ${weatherData[0].lowTemp} °C<br>
                             <strong>POP:</strong> ${weatherData[0].precipitation}%<br>
                             <strong>Humidity:</strong> ${weatherData[0].humidity}%<br>
                             <img src="https://www.weatherbit.io/static/img/icons/a01d.png" alt="All Weather"></img>
                         </div>`;
    }

    document.getElementById('weather-info').innerHTML = innerHTMLWeather;
}

export function updatePicUI(picData) {

    document.getElementById('pixabay-pic').innerHTML = `<img src="${picData.picUrl}" alt="${picData.picName}">`;
}