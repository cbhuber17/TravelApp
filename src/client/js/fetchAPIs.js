// TBD document functions

export async function getGeonamesData(city) {

    // POST the to local server to fetch geonames API
    const response = await fetch('http://localhost:8082/geo', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ city })
    });

    // Try to process the response
    try {
        const apiData = await response.json();

        // Extract the data required for the city
        const lat = apiData.geonames[0].lat;
        const lon = apiData.geonames[0].lng;
        const country = apiData.geonames[0].countryName;

        const geonamesData = { lat, lon, country };
        return geonamesData;
    }
    catch (error) {
        console.log('ERROR: could not get API data in getGeonamesData().  Msg: ' + error);
        alert('Could not POST data/retrieve to/from server in getGeonamesData.  Make sure the server is up and running.');
    }
}

export async function getWeatherBitData(lat, lon, startDate, endDate) {

    // POST the to local server to fetch CURRENT weatherbit API
    const response = await fetch('http://localhost:8082/weather', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ lat, lon, startDate, endDate }),
    });

    // Try to process the response
    try {
        const apiData = await response.json();

        // Extract weather data for current date [0]
        // Next date would be [1]... so on.
        // This function is to be executed only within 7 days... so valid [0] to [6] inclusive

        //     // Extract weather for the historical date
        //     // Data[0] is the first date - just take this date I guess?
        //     // Data[1] is the second date

        //     // TBD description and icon will be determined by historical "clouds" number
        //     const description = 'Nice day';
        //     const icon = '000';

        let highTemp = '';
        let lowTemp = '';
        let precipitation = '';
        let humidity = '';
        let description = '';
        let icon = '';

        // Forecast data will provide description and an icon
        if (startDate === '' && endDate === '') {
            highTemp = apiData.data[0].high_temp;
            lowTemp = apiData.data[0].low_temp;
            precipitation = apiData.data[0].pop;
            description = apiData.data[0].weather.description;
            humidity = apiData.data[0].rh;
            icon = apiData.data[0].weather.icon;
        }
        // Historical data does not provide description or icons, determine these manually
        else {
            // TBD call function to determine these
            highTemp = apiData.data[0].max_temp;
            lowTemp = apiData.data[0].min_temp;
            precipitation = apiData.data[0].precip;
            humidity = apiData.data[0].rh;
            description = 'Nice day'
            icon = '000';
        }

        const weatherData = { highTemp, lowTemp, precipitation, humidity, description, icon };
        return weatherData;
    }
    catch (error) {
        console.log('ERROR: could not get API data in getWeatherBitData().  Msg: ' + error);
        alert('Could not POST data/retrieve to/from server in getWeatherBitData.  Make sure the server is up and running.');
    }
}

export async function getPixabayData(city) {

    // POST the to local server to fetch Pixabay pic API
    const response = await fetch('http://localhost:8082/pic', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ city }),
    });

    // Try to process the response
    try {
        const apiData = await response.json();

        // Several photo options will be returned
        // Pick the best photo based on the views count
        // TBD maxing the photo count at 100
        // TBD refactor below to getTopPhoto()

        let maxViews = 0;
        let topPhotoUrl = '';

        for (let photo of apiData.hits) {
            if (photo.views > maxViews) {
                topPhotoUrl = photo.webformatURL;
                maxViews = photo.views;
            }
        }

        return topPhotoUrl;

    }
    catch (error) {
        console.log('ERROR: could not get API data in handleSubmit().  Msg: ' + error);
        alert('Could not POST data/retrieve to/from server.  Make sure the server is up and running.');
    }
}