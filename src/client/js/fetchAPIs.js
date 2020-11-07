/*
* Helper function that POSTS data to the local server
* @param {String} url - url to fetch
* @param {String} data - data to be POSTED
* @return {String} - The response from the server
*/
async function serverPOST(url, data) {
    const response = await fetch(`${url}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    });

    return response;
}

/*
* Helper function that checks the response from the server POST
* @param {String} response - response from the server (returned from serverPOST() function)
* @param {String} functionName - name of the function that did the server/API call
* @return {Object} - The API data
*/
async function checkResponse(response, functionName) {

    // Try to process the response
    try {
        const apiData = await response.json();
        return apiData;
    }
    catch (error) {
        console.log(`ERROR: could not get API data in ${functionName}().  Msg: ` + error);
        alert(`Could not POST data/retrieve to/from server in ${functionName}.  Make sure the server is up and running.`);
    }
}

/*
* Function that captures the geonames API data from the local server
* @param {String} city - City to get the geonames data
* @return {Object} - The API data (from checkResponse() function)
*/
export async function getGeonamesData(city) {

    const response = await serverPOST('/geo', { city });

    return await checkResponse(response, getGeonamesData.name);
}

/*
* Function that captures the weatherbit API data from the local server
* @param {String} lat - Latitude to get the weatherbit data
* @param {String} lon - Longitude to get the weatherbit data
* @param {String} startDate - Start date if fetching historical data (forecast data string can be empty)
* @param {String} endDate - End date if fetching historical data (forecast data string can be empty)
* @return {Object} - The API data (from checkResponse() function)
*/
export async function getWeatherBitData(lat, lon, startDate, endDate) {

    const response = await serverPOST('/weather', { lat, lon, startDate, endDate });

    return await checkResponse(response, getWeatherBitData.name);
}

/*
* Function that captures the REST countries API data from the local server
* @param {String} countryCode - Coutnry code (2 character string)
* @return {Object} - The API data (from checkResponse() function)
*/
export async function getRestCountryData(countryCode) {

    const response = await serverPOST('/country', { countryCode });

    return await checkResponse(response, getRestCountryData.name);
}

/*
* Function that captures the pixabay API data from the local server
* @param {String} city - City to get the pixabay data
* @return {Object} - The API data (from checkResponse() function)
*/
export async function getPixabayData(city) {

    const response = await serverPOST('/pic', { city });

    return await checkResponse(response, getPixabayData.name);
}