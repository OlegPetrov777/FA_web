const express = require("express");
const cors = require('cors')
const axios = require("axios");
const app = express();

app.use(cors())
app.use(express.json());

app.listen(8080,() => {
    console.log("Started on PORT 8080");
})
// Add headers

app.get('/test', (req, res) => {
    res.end("OK")
});

app.post('/getExchangeRateByCurrencyName', async (req, res) => {
    let exchangeRate = "";

    await axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
        .then(response => {
            const data = response.data;
            exchangeRate = data["Valute"][req.body.currency]["Value"];
            console.log(exchangeRate)
        })
        .catch();

    res.end(JSON.stringify({exchangeRate: exchangeRate}))
});
