const app = require('../src/client/js/app');

// For all tests, provide an empty implementation of window.alert, don't care about that here
describe("Verify form validation (city/departure date/return date)", () => {

    test("Test empty city", () => {
        window.alert = () => { };

        const city = '';
        const departureDateString = '2020-04-17';
        const returnDateString = '2020-04-20';
        expect(app.validateInput(city, departureDateString, returnDateString)).toBe(false);
    })

    test("Test empty departure date", () => {
        window.alert = () => { };

        const city = 'Paris';
        const departureDateString = '';
        const returnDateString = '2020-04-20';
        expect(app.validateInput(city, departureDateString, returnDateString)).toBe(false);
    })

    test("Test empty return date", () => {
        window.alert = () => { };

        const city = 'Paris';
        const departureDateString = '2020-04-17';
        const returnDateString = '';
        expect(app.validateInput(city, departureDateString, returnDateString)).toBe(false);
    })
})