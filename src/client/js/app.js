export async function processForm(event) {

    event.preventDefault();

    const city = document.getElementById('input-city').value;
    const departureDate = document.getElementById('input-departure-date').value;
    const returnDate = document.getElementById('input-return-date').value;

    // if (departureDate > returnDate) {
    //     alert('Please enter a departure date before the return date.')
    //     // TBD clear form
    // }

    const geonamesData = await Client.getGeonamesData('Edmonton');
    console.log(geonamesData);

    // TBD feels like this should be a ".then" chained promise
    const weatherData = await Client.getWeatherBitData(geonamesData.lat, geonamesData.lon, '', '');
    console.log(weatherData);

    // Start date and end date must be of the format YYYY-MM-DD
    const weatherData2 = await Client.getWeatherBitData(geonamesData.lat, geonamesData.lon, '2020-04-14', '2020-04-15');
    console.log(weatherData2);

    const picUrl = await Client.getPixabayData('Edmonton');
    console.log(picUrl);

    // TBD Could this object be used to add more locations?
    // Create an array on the local server, push/POST this there
    const allData = { geonamesData, weatherData, picUrl };

    // TBD if no photo chosen/available, try getting a photo for the country

    // TBD Update UI based on API fetches
    // Countdown
    // Hotel/fight info
    // Packing list/notes
    // Using LocalStorage
    // Multiple days (forecast only, not historical)


}