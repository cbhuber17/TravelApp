// TBD document functions
export function extractWeatherData(apiData, startDate, endDate) {

    // Extract weather data for current date[0]
    // Next date would be[1]...so on.
    // This function is to be executed only within 7 days...so valid[0] to[6] inclusive

    // Extract weather for the historical date
    // Data[0] is the first date - just take this date I guess?
    // Data[1] is the second date

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

export function extractPixabayPhotoUrl(apiData) {

    // Several photo options will be returned
    // Pick the best photo based on the views count
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