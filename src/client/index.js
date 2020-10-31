import { processForm } from './js/app'
import { getGeonamesData, getWeatherBitData, getPixabayData } from './js/fetchAPIs'
import { extractWeatherData, extractPixabayPhotoUrl } from './js/extract'

// HTML 
import './views/index.html'

// Process the input data when clicked
const button = document.getElementById('process-button');
button.addEventListener('click', processForm);

// Adding to the "Client" library (per the webpack*.js file).
export {
    processForm,
    getGeonamesData,
    getWeatherBitData,
    getPixabayData,
    extractWeatherData,
    extractPixabayPhotoUrl
}

