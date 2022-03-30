window.sendRequest = function sendRequest(event) {
    console.log(event.target.value)
    fetch('http://localhost:8080/getExchangeRateByCurrencyName',
        {
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            body: JSON.stringify({currency: event.target.value})
        })
        .then(async (response) => {
            const value = await response.json()
            const DOMElement = document.getElementById("currency_value");
            DOMElement.innerText = value.exchangeRate;
        })
        .catch(e => {
            console.log(e.message)
        })
}