
const axios = require('axios');
var CMCKey = process.env.CMCKey



const controller = {
    getSingleCryptoData: (req, res) => {
        let currency = req.params.currency
        axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?slug=${currency}`, {
            headers: {
                "Accept": "application/json",
                "X-CMC_PRO_API_KEY": CMCKey,
                "Accept-Encoding": "deflate, gzip",
            },})
        .then(response => {
            res.send(response.data)})
        .catch(err => console.log(err))
    },
    getAllCryptoData: (req, res) => {
        axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`, {
            headers: {
                "Accept": "application/json",
                "X-CMC_PRO_API_KEY": CMCKey,
                "Accept-Encoding": "deflate, gzip",
            },})
        .then(response => {
            res.send(response.data)})
        .catch(err => console.log(err))
    },
}

export { controller as default };