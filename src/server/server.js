// Dotenv allows .env files to hide API keys
const dotenv = require('dotenv');

// Path for dev
// dotenv.config({ path: '../../.env' });

// Path for prod
dotenv.config();

// API keys hidden in .env file
const GEONAMES_API_KEY = process.env.GEONAMES_API_KEY;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

// Express server
const express = require('express');
const app = express();
app.use(express.static('dist'));

// Body-parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS for web communication
const cors = require('cors');
app.use(cors());

// Allow testing of server endpoints /w jest & supertest
module.exports = app;

// Apparently fetch is not defined in NodeJS; it must be installed via npm so the local server can use it
const fetch = require('node-fetch');

// Upon entry of the main page, have the server serve it (based on the '/' input)
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

// Port to use - webpack dev server will be using 8080, so this server should use 8082 for express/production
const port = `8082`;

// Designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Server has started on port number: ${port}!`);
})

/*
* Helper function that checks the API data for errors and sends it
* @param {String} APIResult - request (city name)
* @param {String} functionName - response (returns the API data as an object)
* @param {Object} res - response (returns the API data as an object)
*/
async function checkAPIResultAndSend(APIResult, functionName, res) {
    try {
        APIData = await APIResult.json();
        console.log(APIData);
        res.send(APIData);
    }
    catch (error) {
        console.log(`ERROR: Could not get apiData in ${functionName}().  Msg: ` + error);
        alert(`ERROR: Could not get API data in ${functionName}. Please try again later.`);
    }
}

// POST route for GEONAMES API
app.post('/geo', getGeonamesAPI);

/*
* Async function that does the external API call to geonames.org
* @param {Object} req - request (city name)
* @param {Object} res - response (returns the API data as an object)
*/
async function getGeonamesAPI(req, res) {

    const city = req.body.city;

    const url = `http://api.geonames.org/searchJSON?q=${city}&username=${GEONAMES_API_KEY}`;

    const geonamesAPIResult = await fetch(url);

    await checkAPIResultAndSend(geonamesAPIResult, getGeonamesAPI.name, res);
}

// POST route for WeatherBit API
app.post('/weather', getWeatherBitAPI);

/*
* Async function that does the external API call to weatherbit.io
* @param {Object} req - request (lat/lon/start date/end date)
* @param {Object} res - response (returns the API data as an object)
*/
async function getWeatherBitAPI(req, res) {

    const lat = req.body.lat;
    const lon = req.body.lon;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    let url = ``;

    // Fetch forecast data if trip is soon (within 7 days)
    if (startDate === '' && endDate === '') {
        url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${WEATHERBIT_API_KEY}`;
    }
    // Otherwise fetch historical data
    // Dates are of the format string: 'YYYY-MM-DD'
    else {
        url = `https://api.weatherbit.io/v2.0/history/daily?&lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}&key=${WEATHERBIT_API_KEY}`;
    }

    const weatherbitAPIResult = await fetch(url);

    await checkAPIResultAndSend(weatherbitAPIResult, getWeatherBitAPI.name, res);
}

// POST route for REST Countries API
app.post('/country', getRESTCountryAPI);

/*
* Async function that does the external API call to restcountries.eu
* @param {Object} req - request (country code - 2 character string)
* @param {Object} res - response (returns the API data as an object)
*/
async function getRESTCountryAPI(req, res) {

    const countryCode = req.body.countryCode;

    const url = ` https://restcountries.eu/rest/v2/alpha/${countryCode}`;

    const restCountryAPIResult = await fetch(url);

    await checkAPIResultAndSend(restCountryAPIResult, getRESTCountryAPI.name, res);
}

// POST route for Pixabay API
app.post('/pic', getPixabayAPI);

/*
* Async function that does the external API call to pixabay.com
* @param {Object} req - request (city or country)
* @param {Object} res - response (returns the API data as an object)
*/
async function getPixabayAPI(req, res) {

    const query = req.body.city;

    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo`;

    const pixabayAPIResult = await fetch(url);

    await checkAPIResultAndSend(pixabayAPIResult, getPixabayAPI.name, res);
}

// Testing server GET endpoint (via jest)
app.get('/test', async (req, res) => {
    res.json({ message: 'Message received!' });
})