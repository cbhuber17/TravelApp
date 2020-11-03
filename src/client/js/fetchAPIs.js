// TBD document functions

// Helper functions
async function serverPOST(url, data) {
    const response = await fetch(`http://localhost:8082${url}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    });

    return response;
}

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

export async function getGeonamesData(city) {

    const response = await serverPOST('/geo', { city });

    return await checkResponse(response, getGeonamesData.name);
}

export async function getWeatherBitData(lat, lon, startDate, endDate) {

    const response = await serverPOST('/weather', { lat, lon, startDate, endDate });

    return await checkResponse(response, getWeatherBitData.name);
}

export async function getRestCountryData(countryCode) {

    const response = await serverPOST('/country', { countryCode });

    return await checkResponse(response, getRestCountryData.name);
}

export async function getPixabayData(city) {

    const response = await serverPOST('/pic', { city });

    return await checkResponse(response, getPixabayData.name);
}