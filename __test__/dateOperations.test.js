const dateOperations = require('../src/client/js/dateOperations');

describe("Verify date operations", () => {

    test("Test trip duration", () => {
        const departureDateString = '2020-04-17';
        const returnDateString = '2020-04-20';
        // Last day is also counted
        const expected = 3 + 1;
        expect(dateOperations.getTripDuration(departureDateString, returnDateString)).toStrictEqual(expected);
    })

    test("Test trip countdown", () => {
        const now = new Date();
        now.setHours(0, 0, 0);
        const departureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
        const departureDateString = departureDate.toISOString().split('T')[0];
        console.log(departureDateString);

        const expected = 2;
        expect(dateOperations.getCountdown(departureDateString, '')).toStrictEqual(expected);
    })

})