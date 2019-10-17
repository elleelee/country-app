const request = require('request')


const fixer = (currency, callback) => {
  const url = `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}&symbols=SEK,${currency}&format=1`
  request({url, json: true}, (error, { body } ) => {
    if (error) {
      callback('Unable to connect to the web service!', undefined)
    } else if (body.error) {
      callback('Unable to find currency!', undefined)
    } else {
      const calculateRate = body.rates[currency]
      const baseRate = body.rates.SEK
      const exchangeRate = calculateRate/baseRate
      callback(undefined, exchangeRate)
    }
  })
}

module.exports = fixer

