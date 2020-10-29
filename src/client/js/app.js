async function handleForm(event) {

    event.preventDefault();

    const city = document.getElementById('input-city').value;
    const departureDate = document.getElementById('input-departure-date').value;
    const returnDate = document.getElementById('input-return-date').value;

    if (departureDate > returnDate) {
        alert('Please enter a departure date before the return date.')
        // TBD clear form
    }

    const cityDateDate = { city, departureDate, returnDate };

}