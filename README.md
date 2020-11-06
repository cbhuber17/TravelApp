# Travel App - Front End Nanodegree Capstone Project

## Description
This app takes 3 inputs from the user:
* City destination
* Departure date
* Return date

Using these inputs, the app will provide the weather information for the destination as:
* A 7-day forecast if the departure date is within 1 week
* A historical weather report if the departure date is greater than 1 week

Also, a countdown to the trip is provided, plus the trip duration.  Lastly, an image of the destination is shown to engage interest in the trip!

## Requirements

A local server running NodeJS/Express is used to capture data from the API calls.  The API calls come from 4 different sources:

* [Geonames API](http://www.geonames.org/)
* [Weatherbit API](https://www.weatherbit.io/)
* [RESTCountries API](https://restcountries.eu/)
* [Pixabay API](https://pixabay.com/)

## Installation

With node.js installed, in the project directory where package.json is located, install the project dependencies with the following command:


```
npm install
```

Then the production page is built as follows:

```
npm run build-prod
```

The local server is run as follows:

```
npm run start
```

The page is then opened in a browser at http://localhost:8082/

## Page instructions

Simply provide the information as required in the form (text boxes):

* City destination
* Departure date
* Return date

Then hit GO! and the APIs will do their calls and update the UI below with the updated result.  Errors in the date information will be displayed as an alert on the webpage window.
