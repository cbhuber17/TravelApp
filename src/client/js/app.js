export async function processForm(event) {

    event.preventDefault();

    const city = document.getElementById('input-city').value;
    const departureDate = document.getElementById('input-departure-date').value;
    const returnDate = document.getElementById('input-return-date').value;

    // if (departureDate > returnDate) {
    //     alert('Please enter a departure date before the return date.')
    //     // TBD clear form
    // }

    const weatherAPI = await Client.getGeonamesData('Edmonton').then(function (geonamesData) {
        return Client.getWeatherBitData(geonamesData.geonames[0].lat, geonamesData.geonames[0].lng, '', '');
    });

    const weatherData = Client.extractWeatherData(weatherAPI, '', '');
    console.log(weatherData);

    // // Start date and end date must be of the format YYYY-MM-DD
    // const weatherData2 = await Client.getWeatherBitData(geonamesData.lat, geonamesData.lon, '2020-04-14', '2020-04-15');
    // console.log(weatherData2);

    const picAPI = await Client.getPixabayData('Edmonton');
    const picUrl = Client.extractPixabayPhotoUrl(picAPI);
    console.log(picUrl);


    // TBD Could this object be used to add more locations?
    // Create an array on the local server, push/POST this there
    const allData = { weatherData, picUrl };

    // TBD if no photo chosen/available, try getting a photo for the country

    // TBD Update UI based on API fetches
    // Countdown
    // Hotel/fight info
    // Packing list/notes
    // Using LocalStorage
    // Multiple days (forecast only, not historical)


}