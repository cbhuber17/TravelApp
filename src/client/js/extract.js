// TBD document functions
export function extractWeatherData(apiData, startDate, endDate) {

    let cityName = '';
    let countryCode = '';
    let date = ''
    let highTemp = null;
    let lowTemp = null;
    let precipitation = null;
    let humidity = null;
    let description = '';
    let icon = '';

    // Common forecast/historical attributes
    cityName = apiData.city_name;
    countryCode = apiData.country_code;

    let dailyWeather = [];
    let numDaysForecast = apiData.data.length;

    // Forecast data will provide description and an icon
    if (startDate === '' && endDate === '') {
        for (let i = 0; i < numDaysForecast; i++) {
            date = apiData.data[i].valid_date;
            highTemp = apiData.data[i].high_temp;
            lowTemp = apiData.data[i].low_temp;
            precipitation = apiData.data[i].pop;
            humidity = apiData.data[i].rh;
            description = apiData.data[i].weather.description;
            icon = apiData.data[i].weather.icon;
            dailyWeather.push({ date, cityName, countryCode, highTemp, lowTemp, precipitation, humidity, description, icon });
        }
    }
    // Historical data does not provide description or icons, determine these manually
    else {
        date = apiData.data[0].datetime;
        highTemp = apiData.data[0].max_temp;
        lowTemp = apiData.data[0].min_temp;
        precipitation = apiData.data[0].precip;
        humidity = apiData.data[0].rh;

        // No icon or description available for historical data
        description = '';
        icon = '';
        dailyWeather.push({ date, cityName, countryCode, highTemp, lowTemp, precipitation, humidity, description, icon });
    }

    return dailyWeather;
}

export function extractRestCountryData(apiData) {

    let countryName = apiData.name;
    let countryArea = apiData.area;
    let countryPopulation = apiData.population;
    let countryFlagUrl = apiData.flag;

    return { countryName, countryArea, countryPopulation, countryFlagUrl };

}

export async function extractPicData(weatherData, countryData) {

    // Extract pic of the city
    let picData = await getPicData(weatherData[0].cityName);

    // If unable to get a pic of the city, try getting a pic of the country
    if (picData.picUrl == '') {
        picData = await getPicData(countryData.countryName);
    }

    return picData;
}

async function getPicData(location) {

    let picAPI = await Client.getPixabayData(location);
    let picUrl = extractPixabayPhotoUrl(picAPI);
    let picName = location;

    return { picUrl, picName };
}

function extractPixabayPhotoUrl(apiData) {

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