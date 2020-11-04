import { processForm } from './js/app'
import { getGeonamesData, getWeatherBitData, getRestCountryData, getPixabayData } from './js/fetchAPIs'
import { extractWeatherData, extractRestCountryData, extractPicData } from './js/extract'
import { getDateObjects, getCountdown, getTripDuration } from './js/dateOperations'
import { updateCountdownUI, updateCityCountryUI, updateWeatherUI, updatePicUI } from './js/updateUI'

// Styles via sass
import './styles/main.scss'
import './styles/header.scss'
import './styles/form.scss'
import './styles/body.scss'
import './styles/footer.scss'

// HTML 
import './views/index.html'

// Process the form data when the GO button is clicked
const button = document.getElementById('process-button');
button.addEventListener('click', processForm);

// Adding to the "Client" library (per the webpack*.js file).
export {
    processForm,
    getGeonamesData,
    getWeatherBitData,
    getRestCountryData,
    getPixabayData,
    extractWeatherData,
    extractRestCountryData,
    extractPicData,
    getDateObjects,
    getCountdown,
    getTripDuration,
    updateCountdownUI,
    updateCityCountryUI,
    updateWeatherUI,
    updatePicUI
}
