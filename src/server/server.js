// TBD document functions

// Dotenv allows .env files to hide API keys
const dotenv = require('dotenv');

// Path for dev
dotenv.config({ path: '../../.env' });

// Path for prod
// dotenv.config();

// API keys hidden in .env file
const GEONAMES_API_KEY = process.env.GEONAMES_API_KEY;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const path = require('path');

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

// Apparently fetch is not defined in NodeJS; it must be installed via npm so the local server can use it
const fetch = require('node-fetch');

// Upon entry of the main page, have the server serve it (based on the '/' input)
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

// Port to use - webpack dev server will be using 8080, so this server should use 8081 for express/production
const port = `8081`;

// Designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Server has started on port number: ${port}!`);
})

// POST route for GEONAMES API
app.post('/geo', getGeonamesAPI);

// /*
// * Async function that does the external API call to geonames.org
// * @param {Object} req - request (city name)
// * @param {Object} res - response (returns the API data as an object)
// */
async function getGeonamesAPI(req, res) {

    // TBD JSON object passed through req
    const city = req.body.TBD;

    const url = `http://api.geonames.org/searchJSON?q=${city}&username=${GEONAMES_API_KEY}`;

    const geonamesAPIResult = await fetch(url);

    try {
        geonamesAPIData = await geonamesAPIResult.json();
        console.log(geonamesAPIData);
        res.send(geonamesAPIData);
    }
    catch (error) {
        console.log('ERROR: Could not get GEONAMES apiData in getGeonamesAPI().  Msg: ' + error);
        alert('ERROR: Could not get GEONAMES API data. Please try again later.');
    }
}

// POST route for WeatherBit API
app.post('/weather', getWeatherBitAPI);


async function getWeatherBitAPI(req, res) {

    // TBD JSON object passed through req
    const cityCoords = req.body.TBD;

    // TBD
    const url = `https://api.weatherbit.io/v2.0/history/daily?&lat=${cityCoords.lat}&lon=${cityCoords.lon}&key=${WEATHERBIT_API_KEY}`;

    const weatherbitAPIResult = await fetch(url);

    try {
        weatherbitAPIData = await weatherbitAPIResult.json();
        console.log(weatherbitAPIData);
        res.send(weatherbitAPIData);
    }
    catch (error) {
        console.log('ERROR: Could not get WeatherBit apiData in getWeatherBitAPI().  Msg: ' + error);
        alert('ERROR: Could not get WeatherBit API data. Please try again later.');
    }
}

// POST route for Pixabay API
app.post('/weather', getPixabayAPI);

async function getPixabayAPI(req, res) {

    // TBD JSON object passed through req
    const city = req.body.TBD;

    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${city}&image_type=photo`;

    const pixabayAPIResult = await fetch(url);

    try {
        pixabayAPIData = await pixabayAPIResult.json();
        console.log(pixabayAPIData);
        res.send(pixabayAPIData);
    }
    catch (error) {
        console.log('ERROR: Could not get Pixabay apiData in getPixabayAPI().  Msg: ' + error);
        alert('ERROR: Could not get Pixabay API data. Please try again later.');
    }
}
